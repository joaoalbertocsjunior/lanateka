#!/bin/bash

# Load environment variables from .env_bash file
source ./env-vars

echo "Creating container: $CONTAINER_NAME"

# Check if the container with the given name already exists
if [[ $(docker ps -a --filter "name=$CONTAINER_NAME" --format '{{.Names}}') == $CONTAINER_NAME ]]; then
  echo "A container with the name '$CONTAINER_NAME' already exists."

  # Prompt for confirmation to terminate the existing container
  read -p "Do you want to terminate the existing container and start a new one? (Y/N): " confirm

  if [[ $confirm =~ ^[Yy]$ ]]; then
    # Stop and remove the existing container if it exists
    if [[ $(docker ps -a --filter "name=$CONTAINER_NAME" --format '{{.Names}}') == $CONTAINER_NAME ]]; then
      echo "Stopping and removing the existing container '$CONTAINER_NAME'..."
      docker stop $CONTAINER_NAME
      docker rm $CONTAINER_NAME
    fi
  else
    echo "Keeping the existing container '$CONTAINER_NAME' running."
    exit 0
  fi
fi

# Prompt for custom network and IP address
read -p "Do you want to enable a custom network and IP address? (Y/N): " enable_custom_network

if [[ $enable_custom_network =~ ^[Yy]$ ]]; then
  # Prompt for network name and IP address
  read -p "Enter the custom network name: " custom_network_name
  read -p "Enter the custom IP address: " custom_ip_address

  # Check if the custom network exists
  if [[ $(docker network ls --filter "name=$custom_network_name" --format '{{.Name}}') != $custom_network_name ]]; then
    echo "The custom network '$custom_network_name' does not exist. Creating the network..."
    docker network create $custom_network_name
  fi

  # Start a new container with custom network and IP address
  docker run -d -p $HOST_PORT:$CONTAINER_PORT --net $custom_network_name --ip $custom_ip_address \
    -m $MEMORY_LIMIT --cpus $CPU_LIMIT --name $CONTAINER_NAME \
    -v $HOST_X11_SOCKET:$CONTAINER_X11_SOCKET -e DISPLAY=$DISPLAY \
    $IMAGE_NAME
else
  # Start a new container without custom network and IP address
  docker run -d -p $HOST_PORT:$CONTAINER_PORT \
    -m $MEMORY_LIMIT --cpus $CPU_LIMIT --name $CONTAINER_NAME \
    -v $HOST_X11_SOCKET:$CONTAINER_X11_SOCKET -e DISPLAY=$DISPLAY \
    $IMAGE_NAME
fi

echo "Container '$CONTAINER_NAME' started successfully."

# Check if the container is running on the desired IP and port
container_ip=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $CONTAINER_NAME)
container_port=$(docker inspect -f '{{range $p, $conf := .NetworkSettings.Ports}}{{(index $conf 0).HostPort}}{{end}}' $CONTAINER_NAME)

echo "Checking if the container is running on IP: $container_ip and Port: $container_port..."

# Wait for the container to be ready for 15 seconds
timeout=15
start_time=$(date +%s)
while true; do
  status=$(curl -s -o /dev/null -w "%{http_code}" http://$container_ip:$container_port)
  if [[ $status -eq 200 ]]; then
    echo "Container is running on IP: $container_ip and Port: $container_port"
    break
  fi
  current_time=$(date +%s)
  elapsed_time=$((current_time - start_time))
  if [[ $elapsed_time -ge $timeout ]]; then
    echo "Failed to start container on IP: $container_ip and Port: $container_port within $timeout seconds."
    exit 1
  fi
  sleep 1
done

# Check if the application is listening
echo "Checking if the application is listening..."

# Wait for the application to start listening
while true; do
  app_output=$(docker logs $CONTAINER_NAME 2>&1)
  if [[ $app_output == *"Listening on port"* ]]; then
    echo "Application is listening."
    break
  fi
  sleep 1
done

# Print the application output
echo "Application output:"
echo "$app_output"

