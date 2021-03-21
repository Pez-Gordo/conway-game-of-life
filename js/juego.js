var canvas
var ctx
var fps = 30

var canvasX = 500 //ancho 
var canvasY = 500 //alto

var tileX, tileY

//creamos el tablero
tablero = creaArray2D(filas, columnas) 

// variables relacionadas con el tablero de juego
var tablero
var filas = 100
var columnas = 100

var blanco = '#fff'
var negro = '#000'



function creaArray2D(f, c) {
    var obj = new Array(f)
    for(y = 0; y < c; y++) {
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

    //ejecutamos el bucle principal
    setInterval(function() {principal();},1000/fps)
}

function borrarCanvas() {
    canvas.width = canvas.width
    canvas.height = canvas.height
}


function principal() {
    console.log('fotograma')
    borrarCanvas()
}