var canvas
var ctx
var fps = 30

var canvasX = 500 //ancho 
var canvasY = 500 //alto

var tileX, tileY

//creamos el tablero
//tablero = creaArray2D(filas, columnas) 

// variables relacionadas con el tablero de juego
var tablero
var filas = 100
var columnas = 100

var blanco = '#ffffff'
var negro = '#000000'



function creaArray2D(f, c) {
    var obj = new Array(f)
    for(y = 0; y < f; y++) {
        obj[y] = new Array(c)
    }
    return obj
}


//objeto agente o turmita
var Agente = function(x, y, estado) {

    this.x = x
    this.y = y
    this.estado = estado //vivo = 1, muerto = 0
    this.estadoProx = this.estado //estado que tendra en el siguiente ciclo
    this.vecinos = [] //array para guardar los vecinos
    //metodo que añade los vecinos del objeto actual
    this.addVecinos = function() {
        var xVecino
        var yVecino
        for(i = -1; i < 2; i++) {
            for(j = -1; j < 2; j++) {
                xVecino = (this.x + j + columnas) % columnas
                yVecino = (this.y + i + filas) % filas
                // descartamos el agente actual. Un agente no puede ser su propio vecino
                if(i != 0 || j != 0) {
                    this.vecinos.push(tablero[yVecino][xVecino])
                }
            }
        }
    }
    this.dibuja = function() {
        
        var color

        if(this.estado == 1) {
            color = blanco
        } else {
            color = negro
        }

        ctx.fillStyle = color
        ctx.fillRect(this.x * tileX, this.y * tileY, tileX, tileY)
    }

    //programamos las leyes de conwel
    this.nuevoCiclo = function() {
        var suma = 0

        //calculamos la cantidad de vecinos vivos
        for(i = 0; i < this.vecinos.length; i++) {
            suma += this.vecinos[i].estado
        }

        //aplicamos las normas
        this.estadoProx = this.estado //por defecto lo dejamos igual

        //muerte: tiene menos de 2 o mas de 3 vecinos
        if(suma < 2 || suma > 3) {
            this.estadoProx = 0
        }

        //vida/reproduccion: tiene exactamente 3 vecinos
        if(suma == 3) {
            this.estadoProx = 1
        }
    }

    this.mutacion = function() {
        this.estado = this.estadoProx
    }

}

function inicializaTablero(obj) {

    var estado

    for( y = 0; y < filas; y++) {
        for(x = 0; x < columnas; x++) {
            estado = Math.floor(Math.random() * 2)
            obj[y][x] = new Agente(x, y, estado)
        }
    }

    for( y = 0; y < filas; y++) {
        for(x = 0; x < columnas; x++) {
            obj[y][x].addVecinos()
        }
    }

}

function borrarCanvas() {
    canvas.width = canvas.width
    canvas.height = canvas.height
}

function inicializa() {

    //asociamos el canvas
    canvas = document.getElementById('pantalla')
    ctx = canvas.getContext('2d')

    //ajustamos el tamaño 
    canvas.width = canvasX
    canvas.height = canvasY

    //calcualmos el tamaño de las losas
    tileX = Math.floor(canvasX / filas)
    tileY = Math.floor(canvasY / columnas)

    //creamos el tablero
    tablero = creaArray2D(filas,columnas)


    //inicializamos tablero
    inicializaTablero(tablero)

    //ejecutamos el bucle principal
    setInterval(function() {principal()}, 1000 / fps)
}

function dibujaTablero(obj) {

    //dibuja los agentes
    for(y = 0; y < filas; y++) {
        for(x = 0; x < columnas; x++) {
            obj[y][x].dibuja()
        }
    }

    //calcula siguiente ciclo
    for(y = 0; y < filas; y++) {
        for(x = 0; x < columnas; x++) {
            obj[y][x].nuevoCiclo()
        }
    }

    //aplica la mutacion
    for(y = 0; y < filas; y++) {
        for(x = 0; x < columnas; x++) {
            obj[y][x].mutacion()
        }
    }
}






function principal() {
    borrarCanvas()
    dibujaTablero(tablero)
}