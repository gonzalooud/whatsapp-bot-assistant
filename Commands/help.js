async function handleHelpCommand(msg) {
    const mensajeAyuda = `
¡Hola! Soy un bot que te ayuda con diversas tareas.

*Comandos disponibles:*

* *!all*: Menciona a todos los participantes del grupo (solo funciona en grupos).

* *!dolar*: Muestra las cotizaciones actuales del dólar en Argentina (oficial, blue, MEP, CCL, cripto).

* *!juntada*: Menciona a todos los participantes del grupo que esten dentro del rol juntadas.

* *!puto*: Comando para elegir aleatoriamente a quien insultar. (Es un chiste no me cancelen putos)

* *!help*: Muestra este mensaje de ayuda.`;
    await msg.reply(mensajeAyuda);
}

module.exports = handleHelpCommand;