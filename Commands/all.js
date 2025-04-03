async function handleAllCommand(msg, client) {
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
}

module.exports = handleAllCommand;