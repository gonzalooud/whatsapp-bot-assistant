require('dotenv').config();

async function handleJuntadaCommand(msg) {
    const juntadaNumbers = process.env.JUNTADAS_NUMBERS ? process.env.JUNTADAS_NUMBERS.split(',') : [];
    const chatJuntada = await msg.getChat();
    if (chatJuntada.isGroup) {
        const groupMembers = chatJuntada.participants.map(participant => participant.id.user);
        const mentionsJuntada = groupMembers
            .filter(member => juntadaNumbers.includes(member))
            .map(member => `${member}@c.us`);
        console.log("Chat Juntada:");
        console.log(chatJuntada);
        console.log("Miembros en rol:");
        console.log(juntadaNumbers);
        console.log("Filtrados:");
        console.log(mentionsJuntada);
        let textJuntada = '';
        mentionsJuntada.forEach(mention => {
            textJuntada += `@${mention.split('@')[0]} `;
        });
        await chatJuntada.sendMessage(textJuntada, { mentions: mentionsJuntada });
    } else {
        await msg.reply('Este comando solo funciona en grupos.');
    }
}

module.exports = handleJuntadaCommand;