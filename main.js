const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const handleAllCommand = require('./Commands/all.js');
const handleDolarCommand = require('./Commands/dolar.js');
const handleHelpCommand = require('./Commands/help.js');
const handleJuntadaCommand = require('./Commands/juntada.js');
const handlePutoCommand = require('./Commands/puto.js');
const handleUnirmeCommand = require('./Commands/unirme.js');
const handleNotificarRolCommand = require('./Commands/notificarRol.js');
const { quiereNotificarRol } = require('./Services/roles.js');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.initialize();

client.on('message', async (msg) => {
    try {
        switch (msg.body) {
            case '!all':
                handleAllCommand(msg, client);
                break;
            case '!dolar':
                handleDolarCommand(msg);
                break;
            case '!help':
                handleHelpCommand(msg);
                break;
            case '!juntada':
                handleJuntadaCommand(msg);
                break;
            case '!puto':
                handlePutoCommand(msg, client);
                break;
        }

        if (msg.body.startsWith('!unirme')) {
            await handleUnirmeCommand(msg, client);
        } else if (await quiereNotificarRol(msg.body)) {
            await handleNotificarRolCommand(rol, msg);
        }
    } catch (error) {
        console.error(`Error al procesar el comando "${msg.body}":`, error);
        await msg.reply('Lo siento, en este momento no puedo procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.');
    }
});