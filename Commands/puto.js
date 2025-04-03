async function handlePutoCommand(msg, client) {
    const chat = await msg.getChat();
    if (chat.isGroup) {
        let participants = chat.participants;
        const botNumber = client.info.wid.user;
        participants = participants.filter(participant => participant.id.user !== botNumber);
        const randomIndex = Math.floor(Math.random() * participants.length);
        const randomParticipant = participants[randomIndex];
        const mention = `${randomParticipant.id.user}@c.us`;
        const text = `Che te hablan @${randomParticipant.id.user}`;
        await chat.sendMessage(text, { mentions: [mention] });
    } else {
        await msg.reply('Este comando solo funciona en grupos.');
    }
}

module.exports = handlePutoCommand;