const roles = require('../Services/roles.js');

async function handleNotificarRol(rol, msg) {
    const chat = await msg.getChat();
    
    if (chat.isGroup) {
        const userIds = await roles.obtenerUserIdsDeRol(rol);

        let text = '';
        let mentions = [];

        for (let id of userIds) {
            mentions.push(`${id}@c.us`);
            text += `@${id} `;
        }

        await chat.sendMessage(text, { mentions });
    } else {
        await msg.reply('Este comando solo funciona en grupos');
    }
}

module.exports = handleNotificarRol;