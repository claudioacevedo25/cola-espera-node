let socket = io();


//obtenemos los parametros q vienen en la url
//en este caso para saber el ticket que sera atendido por cual escritorio
var searchParams = new URLSearchParams( window.location.search );

if(!searchParams.has('escritorio')){//has pregunta si si ese campo viene en la URL..retorna un bool
    window.location = 'index.html';
    throw new Error(' Es necesario un escritorio');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');


$('h1').text(`Escritorio ${escritorio}`);

$('button').on('click', function() {
    console.log('click');
    socket.emit('atenderTicket', {escritorio: escritorio}, function(resp){
        
        console.log(resp);
        if(resp === 'No hay tickets por atender '){
            label.text(resp);
            alert(resp)
            return ;
        }
        label.text('Ticket ' + resp.numero);
    })
})
