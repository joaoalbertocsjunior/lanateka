'use strict';
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode');

class WhatsAppClient {
    constructor(io) {
        if (WhatsAppClient.instance) {
            return WhatsAppClient.instance;
        };
        const clientConfiguration = {
            puppeteer: {
                headless: true,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--no-first-run',
                    '--no-zygote',
                    '--single-process', // This dont work on windows
                    '--disable-gpu'
                ],
                wsEndpoint: 'wss://web.whatsapp.com/ws'
            }
        };
        this.client = new Client(clientConfiguration);
        this.client.on('error', (error) => {
            console.log(error);
        });
        this.io = io;
        this.qrCodeData = '';
        this.qrListener = this.handleQR.bind(this);
        this.client.on('qr', this.qrListener);
        WhatsAppClient.instance = this;
    };

    async handleQR(qr) {
        console.log('new qr');
        this.qrCodeData = await qrcode.toDataURL(qr);
        this.io.emit('qr', this.qrCodeData);
    };

    getInstance() {
        this.client.initialize();
        return this.client;
    };

    destroy() {
        this.client.removeListener('qr', this.qrListener);
        this.client.destroy();
    };
};

module.exports = WhatsAppClient;