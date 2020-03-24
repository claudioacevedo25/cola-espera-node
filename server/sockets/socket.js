const { io } = require('../server');
const {TicketControl} = require('../classes/ticket-control')


const ticketControl = new TicketControl();

io.on('connection', (client) => {

   client.on('siguienteTicket', (data, callback) => {

    let siguiente = ticketControl.siguieteTicket();
        console.log(siguiente);
        callback(siguiente);

    })

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoticket(),
        ultimos4:ticketControl.getUltimos4()
    })
    
    //la data seria lo que yo quiero enviar y el callback notifica cuando se haga el proceso
    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                message: 'Se necesita el escritorio que atendera al ticket'
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio)
        callback(atenderTicket);

        //actualizar / notificar cambios en los ULTIMOS 4
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        })
    })

});