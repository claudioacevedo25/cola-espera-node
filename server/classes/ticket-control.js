//para grabar el archvo Json en la carpeta json debo importar 
const fs = require('fs');

class Ticket {

    constructor(numero, escritorio){
        this.numero = numero,
        this.escritorio = escritorio
    }
}





class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = []; //esto va atender todos los tiquetes pendientes por atender 
        this.ultimos4 = [];//almacena los ultimos 4 turno para ser mostrados en la pantalla
        let data = require('../data/data.json');

        //evalua si es el mismo dia y sino reinicia todo en un nuevo dia
        if (data.hoy === this.hoy ) {

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;

        } else {
            this.reiniciarConteo();
        }

    }

    siguieteTicket(){

        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarDataJson();

        return `Ticket ${this.ultimo}`;

    }


    getUltimoticket(){

        return `Ticket ${this.ultimo}`;
    }


    getUltimos4(){
        return this.ultimos4;
    }


    atenderTicket( escritorio ){
        
        if(this.tickets.length === 0 ){
            return 'No hay tickets por atender '
        }

        console.log(this.tickets);
        let numeroTicket = this.tickets[0].numero;//este es el primer numero para atender, por eso la posicion cero
        console.log(numeroTicket);
        this.tickets.shift();//elimino el primer ticket del arreglo, para no acumular los ue ya se atendieron o se estan atendiendo

        //genero nueva instancia de un ticket para atender
        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimos4.unshift(atenderTicket);  // este metodo agrega el objeto al inicio del arreglo

        //verifico q solo existan 4 tickets en ese arreglo
        if(this.ultimos4.length > 4) {
            this.ultimos4.splice(-1,1); //borra el ultimo elemnto del array
        }

        console.log(`ultimos 4`);
        console.log(this.ultimos4);

        this.grabarDataJson();
        return atenderTicket;

    }



    
    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        console.log('Se ha inicializado el sistema');
        this.grabarDataJson();
    }


    grabarDataJson() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }

 
}


module.exports = {
    TicketControl
}