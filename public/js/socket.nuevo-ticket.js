
//comando para establecer la conexion con el servidor , del lado del cliente
var socket = io();

//en JQuery cuando usamos varias veces el mismo elemento html, creamos una variable 
 var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Se establecio la conexion con el servidor');
})

socket.on('disconnect', function() {
    console.log('Se perdio la conexion con el servidor');
})

//esto me coloca el estado del tiket en el momento que se refresca la pagina 
socket.on('estadoActual', function(estadoActual) {
    label.text(estadoActual.actual);
})


$('button').on('click', function() {
    //aca emito un mensaje al servidor a traves del evento (listener) y del lado del serv(socket)
    //lo recibe con client.on y dispara una funcion
    //el segundo parametro va null porque no quiero enviarle nada al servidor
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket); //y para q esto se funcione, necesito que el servidor 
        //ejecute el callback
    });
    
})

