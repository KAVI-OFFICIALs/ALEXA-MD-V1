const { Client, LocalAuth } = require('whatsapp-web.js');
const settings = require('./Settings');
const fs = require('fs');
const path = require('path');

const client = new Client({
    authStrategy: new LocalAuth({ clientId: settings.sessionId })
});

client.on('qr', qr => {
    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('ALEXA-MD WHATSAPP BOT CONNECT TO YOUR WHATSAPP ✅');
    loadCommands();
    loadPlugins();
});

// Load commands dynamically
function loadCommands() {
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        command(client);
    }
}

// Load plugins dynamically
function loadPlugins() {
    const pluginFiles = fs.readdirSync('./plugins').filter(file => file.endsWith('.js'));
    for (const file of pluginFiles) {
        const plugin = require(`./plugins/${file}`);
        plugin(client);
    }
}

client.initialize();
