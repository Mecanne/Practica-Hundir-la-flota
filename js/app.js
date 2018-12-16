/**
 * Para poder disparar, el jugador debe tener los 5 barcos en el tablero, si no no se podra jugar.
 * Para colocar un barco se debe usar el metodo añadirBarco(), si se quieren colocar 5 barcos aleatoriamente se usará el comando
 * colocarBarcosAleatorio().
 * 
 * Actualmente te deja meter barcos de una longitud entre 2 y 5, pero no controla si la longitud que has introducida es valida,
 * es decir, que solo haya un barco de 5, o tro de 4, dos de 3 y uno de 2, nada mas.
 * 
 * Para disparar se usará el metodo disparar(), si el disparo se ha efectuado devolverá true, si no false.
 * Cuando se dispara, la maquina lo hará automaticamente.
 * 
 * Las pruebas no han sido realizadas, no me ha dado tiempo.
 */


const LongitudTablero = 10;

class Jugador {

    constructor(id) {
        this.id = id; // Id del jugador
        this.ataques = new Array(); // Array de ataques
        // Si este jugador representa al ordenador, le asignaremos dos tableros, uno en el que disparar, y otro en el que estaran los barcos.
        if (id === "ia") {
            //Creamos tablero que contiene a los barcos.
            this.tableroBarcos = new Tablero("oculto");
            //Colocamos los barcos aleatoriamente.
            this.tableroBarcos.colocarBarcosAleatorio();
            //Creamos el tablero que verá el jugador.
            this.tableroDisparos = new Tablero("ia");

            //Dibujamos el tablero.
            this.tableroDisparos.dibujarTablero();
            // Establecemos una variable controlará si esta en modo "buscar", es decir, si ha encontrado un barco y esta en proceso de derribarlo.
            this.buscar = false; // Al principio no estará buscando
            this.posicionABuscar = new Array(2); // Array donde se encuentra la posicion 
        } // Si no, significa que es el jugador.
        else {
            //Creamos el tablero del jugador.
            this.tableroJugador = new Tablero("jugador");
            //Dibujamos el tablero.
            this.tableroJugador.dibujarTablero();
        }
    }

    /**
     * Funcion que comprueba si al jugador le quedan barcos vivos.
     */
    comprobarVidas() {
        var vida = 0;
        if (this.id === "ia") {
            // Para cada barco, le consulta su vida y se la suma a la variable suma.
            for (let i = 0; i < this.tableroBarcos.barcos.length; i++) {
                vida += this.tableroBarcos.barcos[i].vida;
            }
            // Si esta es cero, significa que el jugador a perdido, por lo que se devolvera true
            if (vida === 0) return true;
            return false;
        } else {
            // Para cada barco, le consulta su vida y se la suma a la variable suma.
            for (let i = 0; i < this.tableroJugador.barcos.length; i++) {
                vida += this.tableroJugador.barcos[i].vida;
            }
            // Si esta es cero, significa que el jugador a perdido, por lo que se devolvera true
            if (vida === 0) return true;
            return false;
        }
    }

    /**
     * Comprueba si un barco esta en la posicion pasada, y si es asi, te devuelve la posicion en la que se encuentra el barco en el array del tablero.
     * @param {number} fila 
     * @param {number} columna 
     */
    comprobarBarcoEnPosicion(tablero, fila, columna) {

        // En cada barco, vamos a buscar si esta en la coordenada pasada.
        for (let i = 0; i < tablero.barcos.length; i++) {
            switch (tablero.barcos[i].direccion) {
                case "v":
                    // Si esta en vertical, y no esta en la misma columna, siginifica que el barco no va a encontrarse, por lo que pasamos al siguiente barco.
                    if (tablero.barcos[i].columna !== columna) continue;
                    // Si esta en la misma columna, recorremos todas las filas desde el origen para ver si la posicion coincide con la que queremos buscar.
                    for (let l = 0; l < tablero.barcos[i].longitud; l++) {
                        // Si alguna de las filas coincide, devuelve la poscion del barco en el array.
                        if (tablero.barcos[i].fila + l === fila) return i;
                    }
                case "h":
                    // Si esta en horizontal, y no esta en la misma fila, siginifica que el barco no va a encontrarse, por que saltamos al siguiente barco.
                    if (tablero.barcos[i].fila !== fila) continue;
                    // Si esta en la misma fila, recorremos todas las columnas desde el origen para ver si la posicion que queremos buscar coincide con la de algun barco.
                    for (let l = 0; l < tablero.barcos[i].longitud; l++) {
                        // Si alguna de las columnas coincide, devuelve la poscion del barco en el array.
                        if (tablero.barcos[i].columna + l === columna) return i;
                    }
            }
        }
        return false;
    }

    /**
     * Muesta el tablero dependiendo de ltipo del jugador.
     */
    mostrarTablero() {
        if (id === "ia") {
            this.tableroDisparos.dibujarTablero();
        }
        else {
            this.tableroJugador.dibujarTablero();
        }
    }

    /**
     * Establece un contrincante al jugador.
     * @param {object} contrincante Jugador que sera el conctrincante.
     */
    establecerContrincante(contrincante) {
        this.contrincante = contrincante;
    }

    /**
     * Metodo que sirve para disparar a un tablero.
     * @param {number} fila Fila a la que disparar.
     * @param {number} columna Columna al a que dirsparar.
     */
    disparar(fila, columna) {
        // Si ya se ha realizado ese ataque, devolvera false.
        if (this.comprobarAtaque(fila, columna)) return false;
        // Si juega el ordenador, atacará a cualquier posicion del tablero del jugador.
        console.log("El jugador: " + this.id + " ha disparado a la posicion " + fila + "," + columna + ".");
        //Posteriormente plantearemos la "inteligencia articial".
        if (this.id === "ia") {
            // Si la cantidad de barcos no es 5, no dejará atacar.
            if (this.tableroBarcos.barcos.length !== 5) return false;

            // Si no encuentra un barco, pondrá una a en el tablero.
            if (this.contrincante.tableroJugador.tabla[fila][columna] === 0) {
                this.contrincante.tableroJugador.tabla[fila][columna] = "A";
                console.log("AGUA");
            } // Si encuentra un barco, sustituye la posicion en el tablero por una B.
            else {
                this.contrincante.tableroJugador.tabla[fila][columna] = "B";
                // Le restamos uno de vida al barco dañado.
                if (this.contrincante.tableroJugador.barcos[this.comprobarBarcoEnPosicion(this.contrincante.tableroJugador, fila, columna)].restarVida()) {
                    console.log("BARCO TOCADO");
                }
            }
            this.contrincante.tableroJugador.dibujarTablero(); // Dibujamos el tablero
        } else {

            // Si la cantidad de barcos no es 5, no dejará atacar.
            if (this.tableroJugador.barcos.length !== 5) return false;

            // Si en el tablero enemigo hay un 0, es que hay agua, entonces ponemos una A en la posicion atacada.
            if (this.contrincante.tableroBarcos.tabla[fila][columna] === 0) {
                this.contrincante.tableroDisparos.tabla[fila][columna] = "A";
                console.log("AGUA");
            } else {
                // Si no es 0, es que hay un barco.
                this.contrincante.tableroDisparos.tabla[fila][columna] = "B";
                if (this.contrincante.tableroBarcos.barcos[this.comprobarBarcoEnPosicion(this.contrincante.tableroBarcos, fila, columna)].restarVida()) {
                    // Si le sigue quedando vida, ponemos que el barco ha sido tocado.
                    if (this.contrincante.tableroBarcos.barcos[this.comprobarBarcoEnPosicion(this.contrincante.tableroBarcos, fila, columna)].vida > 0) {
                        console.log("BARCO TOCADO");
                    } else { // Si no es que el barco esta hundido.
                        console.log("BARCO HUNDIDO");
                    }
                }

            }
            while (true) {
                if (this.contrincante.disparar(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10))) break;
            }
            this.contrincante.tableroDisparos.dibujarTablero();
        }
        this.ataques.push([fila, columna]);
        return true;
    }

    /**
     * Comprueba si un ataque ha sido ya realizado o no.
     * @param {number} fila Fila que queremos comprobar.
     * @param {number} columna Columna que queremos comprobar.
     */
    comprobarAtaque(fila, columna) {
        //Vamos a comrpobar si se ha realizado ya el ataque.
        for (let i = 0; i < this.ataques.length; i++) {
            //Si cualquier ataque coincide con las coordenadas pasadas, devolverá true.
            if (this.ataques[i][0] === fila && this.ataques[i][1] === columna) return true;
        }
        // Si no, devolverá false, indicando que no se ha realizado ese ataque.
        return false;
    }


}

class Tablero {

    constructor(id) {
        this.id = "tablero" + id; // Id del tablero o del elemento HTML al que hará referencia el tablero.
        this.inicializarTablero(); // Inicializamos el tablero.
        this.barcos = new Array(); // Array de barco.
    }

    comprobarBarco(fila, columna) {
        return this.tabla[fila][columna] !== 0;
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
        if (this.cantidadBarcos >= 5) return false;
        var longitudes_validas = [5,4,3,3,2]; // Array con las longitudes validas.

        // De las posiciones restantes, si no coinicide ninunga con la introducida, no se dejará meter el barco.
        var coincide = false;
        for(let i = 0; i < longitudes_validas.length; i++){
            if(longitudes_validas[i] === longitud) coincide = true;
        }

        // Si no coincide ningun numero con los que podemos introducir, se deolverá false.
        if(!coincide) return false;
        
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
                        if (i === 0 && fila > 0) {
                            if (this.tabla[fila + i - 1][columna] !== 0) return false;
                        }
                        // Si esta en la ultima posicion, y la siguiente posicion no es el borde, comprueba que no hay ningun barco delante.
                        if (i === longitud - 1 && fila + longitud < LongitudTablero) {
                            if (this.tabla[fila + i + 1][columna] !== 0) return false;
                        }
                        // Si esta rozando el borde derecho, comprobará que no hay barcos a su izquierda
                        if (columna === LongitudTablero - 1) {
                            if (this.tabla[fila + i][columna - 1] !== 0) return false;
                        } else
                            // Si no, si esta rozando el borde izquierdo, comprobará que no hay barcos a su derecha
                            if (columna === 0) {
                                if (this.tabla[fila + i][columna + 1] !== 0) return false;
                            }
                            // Si no, comprueba que no haya ningun barco en ninguno de los dos lados
                            else {
                                if (this.tabla[fila + i][columna - 1] !== 0) return false; // Izquierda
                                if (this.tabla[fila + i][columna + 1] !== 0) return false; // Derecha
                            }
                        // Comprueba que no hay ningun barco en la posicion en la que queremos establecer su origen y en todo su recorrido.
                        if (this.tabla[fila + i][columna] !== 0) return false;
                    }
                    //Establecemos los valores a cada posicion.
                    for (let i = 0; i < longitud; i++) {
                        this.tabla[fila + i][columna] = longitud;
                    }
                    this.dibujarTablero();
                    this.barcos.push(new Barco(fila, columna, direccion, longitud));
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
                        if (columna > 0 && i === 0) {
                            if (this.tabla[fila][columna + i - 1] !== 0) return false;
                        }
                        // Si esta colocando el final del barco, y la siguiente posicion no se excede de la longitud del tablero, comprueba que no haya ningun barco delante.
                        if (i == longitud - 1 && columna + longitud < LongitudTablero) {
                            if (this.tabla[fila][columna + i + 1] !== 0) return false;
                        }
                        // Si esta rozando el borde superior, comprobará que no hay barcos debajo suya.
                        if (fila === 0) {
                            if (this.tabla[fila + 1][columna] !== 0) return false;
                        } else
                            // Si no, si esta rozando el borde inferior, comprobará que no hay barcos encima suya
                            if (fila === LongitudTablero - 1) {
                                if (this.tabla[fila - 1][columna] !== 0) return false;
                            }
                            // Si no, comprueba que no haya ningun barco a ninguno de los dos lados
                            else {
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
                    this.barcos.push(new Barco(fila, columna, direccion, longitud));
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
    colocarBarcosAleatorio() {
        // Primero vaciamos el tablero
        this.vaciarTablero();
        // Creamos un array con todas las longitudes de los barcos que vamos a crear
        var longitudBarcos = [5, 4, 3, 3, 2];
        // Establecemos un contador para ir contando los barcos que hemos ido creando.
        var contador = 0;
        // Mientras no haya cinco barcos, se creará un nuevo barco en una posicion aleatoria.
        while (contador < 5) {
            let fila = Math.floor(Math.random() * 10); // Posicion aleatoria entre 0 y 9
            let columna = Math.floor(Math.random() * 10); // Posicion aleatorio entre 0 y 9
            let direccion = Math.ceil(Math.random() * 2); // Posicion aleatoria entre 1 y 2
            // Escogemos el numero aleatorio alamcenado en la variable direccion.
            switch (direccion) {
                case 1: // Horizontal
                    direccion = "h";
                    break;
                case 2: // Vertical
                    direccion = "v";
                    break;
            }
            // Si se consigue añadir el barco, se sumará 1 al contador.
            if (this.añadirBarco(fila, columna, longitudBarcos[contador], direccion)) {
                contador++;
            }
        }
        // Dibujamos de nuevo el tablero para 
        this.dibujarTablero();
        return true;
    }

    vaciarTablero() {
        this.cantidadBarcos = 0;
        this.inicializarTablero();
        this.dibujarTablero();
    }

    dibujarTablero() {
        let tabla = document.getElementById(this.id);

        if (tabla !== null) {
            while (tabla.hasChildNodes()) {
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
        this.fila = fila; // Fila de origen
        this.columna = columna; // Columna de origen
        this.direccion = direccion; // Direccion en la que se orienta.
        this.longitud = longitud; // Longitud del barco
        this.vida = longitud; // Vida del barco, que será igual a la longitud.
    }

    restarVida() {
        if (this.vida > 0) {
            this.vida--;
            return true;
        }
        return false;
    }

}

jugador1 = new Jugador(1);
ia = new Jugador("ia");

jugador1.establecerContrincante(ia);
ia.establecerContrincante(jugador1);
