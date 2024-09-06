const { Client, LocalAuth } = require('whatsapp-web.js');
const settings = require('./Settings');

const client = new Client({
  authStrategy: new LocalAuth({ clientId: settings.sessionId })
});

client.on('qr', qr => {
    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('ALEXA-MD WHATSAPP BOT CONNECT TO YOUR WHATSAPP ✅');
});

client.initialize();
