const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
//import fetch from 'node-fetch';

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
    switch (msg.body) {
        case '!all':
            const chatAll = await msg.getChat();

            if (chatAll.isGroup) {
                const botNumberAll = client.info.wid.user;
                let textAll = '';
                let mentionsAll = [];

                for (let participant of chatAll.participants) {
                    if (participant.id.user !== botNumberAll) {
                        mentionsAll.push(`${participant.id.user}@c.us`);
                        textAll += `@${participant.id.user} `;
                    }
                }

                await chatAll.sendMessage(textAll, { mentions: mentionsAll });
            } else {
                await msg.reply('Este comando solo funciona en grupos.');
            }
            break;
        case '!dolar':
            try {
                const responseDolar = await fetch('https://dolarapi.com/v1/dolares');
                const dataDolar = await responseDolar.json();

                let mensajeDolar = '';
                const cotizacionesDeseadas = ['oficial', 'blue', 'bolsa', 'contadoconliqui', 'cripto'];
                const nombresRenombrados = {
                    'bolsa': 'MEP',
                    'contadoconliqui': 'CCL'
                };

                for (const cotizacion of dataDolar) {
                    if (cotizacionesDeseadas.includes(cotizacion.casa)) {
                        const nombreMostrar = nombresRenombrados[cotizacion.casa] || cotizacion.nombre;
                        mensajeDolar += `*${nombreMostrar}*\n`;
                        mensajeDolar += `*Compra*: ${cotizacion.compra} | *Venta*: ${cotizacion.venta}\n\n`;
                    }
                }

                await msg.reply(mensajeDolar.trim());

            } catch (error) {
                console.error('Error al obtener las cotizaciones del dólar:', error);
                await msg.reply('No pude obtener las cotizaciones del dólar en este momento.');
            }
            break;
            case '!help':
                const mensajeAyuda = `
                    ¡Hola! Soy un bot de programación que te ayuda con diversas tareas.
                    
                    **Comandos disponibles:**
                    
                    * *!all*: Menciona a todos los participantes del grupo (solo funciona en grupos).
                    * *!dolar*: Muestra las cotizaciones actuales del dólar en Argentina (oficial, blue, MEP, CCL, cripto).
                    * *!help*: Muestra este mensaje de ayuda.
                                `;
                await msg.reply(mensajeAyuda);
            break;
    }
});