class Jugador{
    constructor(id,barcos){
        this.disparos = new Array();
        this.id = id;
        this.barcos = barcos;
        this.arrayFilas = new Array(10);
    }

    construirTablero(){
        var tablero = document.getElementById("tablero" + this.id);
        var contador = 0;

        while(tablero.hasChildNodes()){
            tablero.removeChild(tablero.firstChild);
        }

        for(let f = 0; f < 11;f++){
            var fila = document.createElement("tr");
            this.arrayFilas[f] = new Array(10);
            for(let c = 0; c < 11;c++){
                var columna = document.createElement("td");
                fila.appendChild(columna);
                // Si estamso en la primera casilla, no hacemos nada.
                if(f === 0 && c === 0){
                }else if(f === 0 && c !== 0){ // Si es cualquier posicion de la primera fila se imprimirá un letra correspondiente a la casilla.
                    columna.textContent = String.fromCharCode(64 + c);
                }else if(f !== 0 && c === 0){ // Si es cualquier posicion de la primera columna se imprimirá un numero correspondiente a esa casilla.
                    columna.textContent = f;
                }else{// Si no, se asignará a cada posicion del array que contiene el tablero un 0
                    this.arrayFilas[f][c] = 0;
                    columna.id = contador;
                    columna.textContent = "~";
                    //columna.addEventListener("click",accion);

                    contador++;
                }
            }
            tablero.appendChild(fila);
        }
    }
}

class barco{

    /**
     * 
     * @param {Tamaño del barco} dimension 
     * @param {Direccion en la que se horienta (1,2,3,4)} direccion 
     * @param {} posicion 
     */
    constructor(dimension,direccion,posicionInicial){
        this.dimension = dimension;
        this.direccion = direccion;
        this.posicionInicial = posicionInicial;
    }

    
}

jugador1 = new Jugador(1,null);
jugador1.construirTablero();

jugador2 = new Jugador(2,null);
jugador2.construirTablero();