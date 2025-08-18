// ----- documentación Javascript/ECMAScript ----------
// https://www.w3schools.com/js/default.asp
// https://developer.mozilla.org/es/docs/Web/JavaScript
// https://es.javascript.info/


var a = 18
var b = 17
var c = a + b
console.log(c)

console.log('Hola NodeJS')

// ----------------------------------------------------------
//  Comparación entre constructores de variables en JS5 y ES6
// ----------------------------------------------------------

// ------- JS5 (var) --------
/* var d = 8
var d = 9
console.log(d)

var PI = 3.1415926
PI = 2.7
console.log(PI)

for(var i=0; i<5; i++) {
    console.log(i)
}
console.log(i) */


// ------- ES6 (let/const) --------
let d = 8
d = 9
console.log(d)

const PI = 3.1415926
//PI = 2.7
console.log(PI)

for(let i=0; i<5; i++) {
    console.log(i)
}
//console.log(i)


// -----------------------------------------
console.log('/* ---------- VAR ---------- */')

// bloque de código funcional
//var x = 777
function varTest() {
    var x = 11

    // bloque de código condicional
    if(true) {
        var x = 17
        x = 18
        console.log(x)
    }

    // bloque de código anónimo
    {
        var x = 27
        console.log(x)
    }

    console.log(x)
}

varTest()
//console.log(x)

// ---------------------------------------------------
console.log('/* ---------- LET ---------- */')

// bloque de código funcional
//let x = 777
function letTest() {
    let x = 11

    // bloque de código condicional
    if(true) {
        let x = 17
        x = 18
        console.log(x)
    }

    // bloque de código anónimo
    {
        let x = 27
        console.log(x)
    }

    console.log(x)
}

letTest()
//console.log(x)


// ---------------------------------------------------
console.log('/* ---------- CONST ---------- */')

// bloque de código funcional
//const x = 777
function constTest() {
    const x = 11

    // bloque de código condicional
    if(true) {
        const x = 17
        //x = 18
        console.log(x)
    }

    // bloque de código anónimo
    {
        const x = 27
        console.log(x)
    }

    console.log(x)
}

constTest()
//console.log(x)


console.log('-----------------------------')

// Tipado en JS5/ES6 (dinámico/débil)
var nombre = 'Pepe'         // dinámico
console.log(nombre, typeof nombre)
nombre = -123.45            // débil
console.log(nombre, typeof nombre)


// ----------------------------------------------------------
//  Comparación entre constructores de funciones en JS5 y ES6
// ----------------------------------------------------------

// ---------- JS5 -----------

/* 
//function sumar(a,b) {
//    return a + b
//}

var sumar = function(a,b) {
    return a + b
}

//sumar = 'Pepe'

var n1 = 17, n2 = 5

// concatenación de strings JS5
console.log('La suma de ' + n1 + ' más ' + n2 + ' es ' + sumar(n1,n2)) */


// ---------- ES6 (arrow function ó funciones flecha ó expresiones lambda) -----------

const sumar = (a,b) => a + b
//sumar = 'Pepe'
const dobleDe = a => 2 * a

const toUpper = str => {
    let tipo = typeof str
    if(tipo == 'string') {
        return str.toUpperCase() 
    }
    else {
        return `ERROR: El valor de entrada '${str}' es del tipo ${tipo}`
    }
}

const mayorDeEdad = edad => edad>=18? 'Si':'No'

const getPersona = () => ({ nombre: 'Juan', edad: 23 })

let n1 = 17, n2 = 15

// template strings ES6 (``) backtics
console.log(`La suma de ${n1} más ${n2} es ${sumar(n1,n2)}`)
console.log(`El doble de ${n1} es ${dobleDe(n1)}`)
    
console.log( toUpper('Hola!') )    
console.log( toUpper(123) )    
console.log( toUpper(true) )    

console.log( mayorDeEdad(17) )
console.log( mayorDeEdad(27) )

console.log( getPersona() )


// ---------------------------
//      Clases en ES6
// ---------------------------
class Timer {
    contador = 0

    constructor(cont) {
        this.contador = cont
    }

    getContador() {
        return this.contador
    }

    setTimer(ms) {
        /* setInterval(function() {
            console.log(++this.contador)
        },ms) */

        setInterval(() => {
            console.log(++this.contador)
        },ms)
    }
}

const timer1 = new Timer(50)
const timer2 = new Timer(100)
const timer3 = new Timer(150)

console.log(timer1.getContador())
console.log(timer2.getContador())
console.log(timer3.getContador())

timer1.setTimer(1000)
timer2.setTimer(3000)
timer3.setTimer(10000)


