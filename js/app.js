const LongitudTablero = 10;

class Jugador {
    constructor(id) {
        this.id = id;
        this.ataques = new Array(); // Array de ataques
        this.tablaDisparos = new Tablero("tablero" + id); // Tablero que se mostrará
        this.tablaDisparos.dibujarTablero();
        this.tablaBarcos = new Tablero("oculto"); // Tablero que contendrá nuestros barcos.
        this.tablaBarcos.colocarBarcosAleatorio(); // Colocamos los barcos aleatoriamente.
        console.log("Jugador con id: '" + id + "' creado");
    }

    mostrarTablero() {
        this.tabla.dibujarTablero();
    }

    establecerContrincante(contrincante){
        this.contrincante = contrincante;
    }

    disparar(fila,columna){
        // Si esa casilla es distinta de cero en la tabla de disparos, significa que ya se ha disparado ahi, por lo que retornará false.
        if(this.contrincante.tablaDisparos.tabla[fila][columna] !== 0) return false;

        
        if(this.contrincante.tablaBarcos.tabla[fila][columna] === 0){
            this.contrincante.tablaDisparos.tabla[fila][columna] = "A";
        }else{
            this.contrincante.tablaDisparos.tabla[fila][columna] = "B";
        }
        this.contrincante.tablaDisparos.dibujarTablero();
        console.log("El jugador: " + this.id + " ha disparado a la posicion " + fila + "," + columna + ".")
        if(this.contrincante.id === "ia"){
            this.contrincante.disparar(Math.floor(Math.random()*10),Math.floor(Math.random()*10));
        }
        return true;
    }


}

class Tablero {
    constructor(id) {
        this.id = id; // Id del tablero o del elemento HTML al que hará referencia el tablero.
        this.inicializarTablero();
        console.log("Tablero creado");
        this.cantidadBarcos = 0;
        this.mostrar = true;
    }
    
    comprobarBarco(fila,columna){
        return this.tabla[fila][columna] !== 0;
    }

    /**
     * Funcion que asigna un jugador a este tablero.
     * @param {Object} jugador Jugador al que pertenecerá este tablero.
     */
    establecerJugador(jugador){
        this.jugador = jugador;
    }

    mostrar(valor){
        this.mostrar = valor;
    }

    inicializarTablero() {
        // Creamos el array que contiene las casillas del tablero.
        this.tabla = new Array(LongitudTablero);
        // A cada posicion del array creamos un nuevo array, para asi crear el array bidimensional.
        for (let i = 0; i < this.tabla.length; i++) {
            this.tabla[i] = new Array(LongitudTablero);
        }
        // Establecemos todas las posiciones a 0.
        for (let f = 0; f < this.tabla.length; f++) {
            for (let c = 0; c < this.tabla.length; c++) {
                this.tabla[f][c] = 0;
            }
        }
    }

    /**
     * 
     * @param {number} fila Fila en la que se quiere colocar el barco.
     * @param {number} columna Columna en la que se quiere colocar el barco.
     * @param {number} longitud Longitud que tendrá el barco en cuestion.
     * @param {string} direccion Dirección en la que se orientará el barco.
     */
    añadirBarco(fila, columna, longitud, direccion) {
        if(this.cantidadBarcos >= 5) return false;
        // Cogemos la direccion
        switch (direccion) {
            case "v":
                /**
                 * Si es vertical, primero comprueba que el barco cabe en esa posicion, es decir,
                 * no se sale del tablero.
                 */
                if ((fila + longitud) <= LongitudTablero) {
                    //Comprobamos que no haya ningun barco por medio.
                    for (let i = 0; i < longitud; i++) {
                        // Si esta en la primera posicion, y no esta rozando el borde superior, comprobará si hay algun barco encima de este.
                        if(i === 0 && fila > 0){
                            if (this.tabla[fila + i - 1][columna] !== 0) return false;
                        } 
                        // Si esta en la ultima posicion, y la siguiente posicion no es el borde, comprueba que no hay ningun barco delante.
                        if(i === longitud - 1 && fila + longitud < LongitudTablero){
                            if (this.tabla[fila + i + 1][columna] !== 0) return false;
                        }
                        // Si esta rozando el borde derecho, comprobará que no hay barcos a su izquierda
                        if(columna === LongitudTablero - 1){
                            if (this.tabla[fila + i][columna - 1] !== 0) return false;
                        }else
                        // Si no, si esta rozando el borde izquierdo, comprobará que no hay barcos a su derecha
                        if(columna === 0){
                            if (this.tabla[fila + i][columna + 1] !== 0) return false;
                        }
                        // Si no, comprueba que no haya ningun barco en ninguno de los dos lados
                        else{
                            if (this.tabla[fila + i][columna - 1] !== 0) return false;
                            if (this.tabla[fila + i][columna + 1] !== 0) return false;
                        }
                        // Comprueba que no hay ningun barco en la posicion en la que queremos establecer su origen y en todo su recorrido.
                        if (this.tabla[fila + i][columna] !== 0) return false;
                    }
                    //Establecemos los valores a cada posicion.
                    for (let i = 0; i < longitud; i++) {
                        this.tabla[fila + i][columna] = longitud;
                    }
                    this.dibujarTablero();
                    this.cantidadBarcos++;
                    return true;
                }
                return false;
            case "h":
                /**
                 * Si es horizontal, primero comprueba que el barco cabe en esa posicion, es decir,
                 * no se sale del tablero.
                 */
                if ((columna + longitud) <= LongitudTablero) {
                    //Comprobamos que no haya ningun barco por medio.
                    for (let i = 0; i < longitud; i++) {
                        // Si la columna no es la primera (no roza borde izquierdo) y esta en el punto de inicio del barco, comprobara que no hay algun otro barco detras.
                        if(columna > 0 && i === 0){
                            if (this.tabla[fila][columna + i - 1] !== 0) return false;
                        }
                        // Si esta colocando el final del barco, y la siguiente posicion no se excede de la longitud del tablero, comprueba que no haya ningun barco delante.
                        if(i == longitud - 1 && columna + longitud < LongitudTablero){
                            if (this.tabla[fila][columna + i + 1] !== 0) return false;
                        }
                        // Si esta rozando el borde superior, comprobará que no hay barcos debajo suya.
                        if(fila === 0){
                            if (this.tabla[fila + 1][columna] !== 0) return false;
                        }else
                        // Si no, si esta rozando el borde inferior, comprobará que no hay barcos encima suya
                        if(fila === LongitudTablero - 1){
                            if (this.tabla[fila - 1][columna] !== 0) return false;
                        }
                        // Si no, comprueba que no haya ningun barco a ninguno de los dos lados
                        else{
                            if (this.tabla[fila + 1][columna] !== 0) return false; // Debajo
                            if (this.tabla[fila - 1][columna] !== 0) return false; // Encima
                        } 
                        // Comprueba que no hay ningun barco en la posicion en la que queremos establecer su origen y en todo su recorrido.
                        if (this.tabla[fila][columna + i] !== 0) return false;
                    }
                    //Establecemos los valores a cada posicion.
                    for (let i = 0; i < longitud; i++) {
                        this.tabla[fila][columna + i] = longitud;
                    }
                    this.dibujarTablero();
                    this.cantidadBarcos++;
                    return true;
                }
                return false;
            default:
                return false;
        }
    }

    /**
     * Coloca los barcos de forma aleatoria.
     */
    colocarBarcosAleatorio(){
        this.vaciarTablero();
        var longitudBarcos = [5,4,3,3,2];
        var contador = 0;
        while(contador < 5){
            let fila = Math.floor(Math.random() * 10); // Posicion aleatoria entre 0 y 9
            let columna = Math.floor(Math.random() * 10); // Posicion aleatorio entre 0 y 9
            let direccion = Math.ceil(Math.random() * 2); // Posicion aleatoria entre 1 y 2
            switch(direccion){
                case 1:
                    direccion = "h";
                    break;
                case 2:
                    direccion = "v";
                    break;
            }
            if(this.añadirBarco(fila,columna,longitudBarcos[contador],direccion)){
                contador++;
            }
        }
        this.dibujarTablero();
        return true;
    }

    vaciarTablero(){
        this.cantidadBarcos = 0;
        this.inicializarTablero();
        this.dibujarTablero();
    }

    dibujarTablero() {
        let tabla = document.getElementById(this.id);

        if(tabla !== null){
            while(tabla.hasChildNodes()) {
                tabla.removeChild(tabla.firstChild);
            }
            
            for (let f = 0; f < this.tabla.length; f++) {
                var fila = document.createElement("tr");
                for (let c = 0; c < this.tabla[f].length; c++) {
                    var celda = document.createElement("td");
                    celda.textContent = this.tabla[f][c];
                    fila.appendChild(celda);
                }
                tabla.appendChild(fila);
            }
        }
        
    }
}

class Barco {
    constructor(fila, columna, direccion, longitud) {
        this.posicionY = fila;
        this.posicionX = columna;
        this.direccion = direccion;
        this.longitud = longitud;
        this.estado = "2"; // 2- Intacto / 1- Dañado / 0-Hundido
        console.log("Barco creado en la fila " + this.fila + ", columna " + this.columna + " con una longitud de " + this.longitud + " casillas en direccion" + "m.");
    }

}

jugador1 = new Jugador(1);
ia = new Jugador("ia");

jugador1.establecerContrincante(ia);
ia.establecerContrincante(jugador1);
