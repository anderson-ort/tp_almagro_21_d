import { log } from 'node:console';
import crypto from 'node:crypto';
import { writeFile } from 'fs/promises'
import {Counter} from './utils/counter.utils.js';

// console.log("hELLO WOLRD!!!");

// // datatypes
// //  nativos --> primitivos
// // Number , Boolean, Date , String
// // dtypes no primitivos
// // Array , Objects, ProtoTypes, Function, Symbol 


// let nombrePersona = "Juancho!"
// console.log(nombrePersona.toLocaleLowerCase());


// let arrayNumbers = [1, "9", 10, 1e-10,[], {}, function() {return}] //Tipos heteregenos

// // for para que muestre por console cada uno de estos items. 
// for (let i = 0 ; i < arrayNumbers.length ; ++i ){
//     console.log("este bicho es:\t" + arrayNumbers[i]);
// }

// console.log("en una sola line");
// // interpolacion de texto -> f strings -> 
// for( data of arrayNumbers){console.log(`este bicho es:\t ${data}`)}

// console.log(arrayNumbers);

// const soyUnObjeto = {
//     primerAtributo: "Soy  yo",
//     segundoAtributo: [1,2,3,4],
//     saludar: function(){return "ola k ase?"}
// }


// const unSaludo = soyUnObjeto["saludar"]

// console.warn(unSaludo());

// const { log: print } = console


// print("No soy python wey");

// // let nPers = 

// let i = 0
// for (i of arrayNumbers) {
//     console.log(arrayNumbers[i]);
// }

// functiones normal moogle
// enunciado  ->  hagamos una calculadora



function calculadora(num1, num2 , metodo){
    return metodo(num1,num2)
}

function sumar(a,b){return a+b}

let calculo = calculadora(1, 0, sumar)
console.log("El resultado de la calcu es:\t",calculo);


// function anonimas 
calculo = calculadora(1,2, function(a,b){return a-b})
console.log("El resultado de la calcu es:\t",calculo);

// functiones arrow
calculo = calculadora(1,2, (a,b) => a/b) // callbacks
console.log("El resultado de la calcu es:\t",calculo);




// id como un hash - uuid

let id = crypto.randomUUID()


const timerUno = new Counter("pirulo", id)

// timerUno.getViewerTime(100)
console.log(timerUno);

// == -> comparar por valor
// === -> comprar por valor si no tambien dtype

console.log(1=="1");
console.log(1==="1");


console.log(Boolean([]));
console.log(Boolean(null))

let validacionId


console.log(
    validacionId ?? "me renderizo por que este moacho no existe"
)


const URI = "https://raw.githubusercontent.com/ropensci/historydata/refs/heads/master/data-raw/quasi-war.csv"



let data = fetch(URI, {method: "GET"})
data
    .then(response => response.text()) // Parse the response body as text
    .then(textData =>  { writeFile("./recursos/archivo.csv", textData) }) // Log the parsed text data
    .catch(error => console.error('Error fetching data:', error)); // Handle potential errors



// TICKET: 
//  utilizar la biblioteca fs -> para traer un archivo local y imprimir por consola la primera linea de ese archivo