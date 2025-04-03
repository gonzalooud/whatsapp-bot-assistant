async function handleDolarCommand(msg) {
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
}

module.exports = handleDolarCommand;