FROM alpine:latest

# Install required packages
RUN apk add --update nodejs npm chromium xfce4 dbus-x11

# Set environment variables for Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Copy the application files and install dependencies
WORKDIR /app
COPY . .
RUN npm install

# Expose the application port and start the server
EXPOSE 3000

# Set the entry point to start the graphical environment and run the application
ENTRYPOINT ["/usr/bin/startxfce4"]

# Define the command to start the server within the graphical environment
CMD ["npm", "start"]
