const roles = require('../Services/roles.js')

async function handleUnirme(msg, client) {
    const [_, rol] = msg.body.match(/!unirme +([a-zA-Z]+)/);

    if (rol) {
        const authorContact = await msg.getContact();
        const authorUserId = authorContact.id.user;

        const agregado = await roles.agregar(rol, authorUserId);

        if (agregado) {
            await msg.reply(`Listo, te agregué al '${rol}'`);
        } else {
            await msg.reply(`Ya estas en el rol '${rol}'`);
        }
    } else {
        await msg.reply('No entendí a que rol agregarte. Tenes que escribir !unirme <nombre del rol>, sin <> y sin espacios en el nombre.');
    }
}

module.exports = handleUnirme;