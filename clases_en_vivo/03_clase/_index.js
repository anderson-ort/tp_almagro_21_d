// bibliografia : 
// arrow functions : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

// HOF --> 
const numeros = [
    1,2,3,45,6,7,7,5,34,3,3
] // array

const functionTradicionalAnonima = function(x) {
    return x ** 3
}

const functionArrow = x => x ** 3

const numerosPotenciados = numeros.map( functionArrow )

console.log(numerosPotenciados);

// callbacks

const cajaRegistradora = []
// const pagandoABryan = (transferencia, metodoDePago) => metodoDePago(transferencia)

function pagandoABryan(transferencia, metodoDePago){
    metodoDePago(transferencia)
}

const pagoEfectivo = (transferencia) => cajaRegistradora.push(transferencia)

const pagoeMercadoPago = transferencia => {
    console.log("Estas usando un metodo de pago con recargo")
    cajaRegistradora.push( transferencia * 1.1)
    console.log("realizado el pago");
}

pagandoABryan(300, pagoEfectivo)
pagandoABryan(100, pagoeMercadoPago)
pagandoABryan(5000, transferencia =>  cajaRegistradora.push( transferencia * 0.89) )

console.log(cajaRegistradora);

// closures

// reactjs -- vue -> manejos  

// colombia y peru -> contemos 10 ||  0  -->
// !! challenge transformar en arrow functions
const counter = function(initState){
    return function(){
        initState++
        console.log(`estoy contando y ahora llego:\t${initState}`);
    }
}

const peru = counter(0)
const colombia = counter(10)

peru()
peru()
peru()
peru()

colombia()
colombia()
colombia()
colombia()

// console.log(initState);


// Promesas 


const fetchDataFromApi = () => new Promise(  (resolve, reject) =>  {
    setTimeout(() => resolve("Tengo todos los datos"), 3000)
} )


fetchDataFromApi()
    .then( data => console.log(data)
    )
    .catch(e => console.log(e)
    )


console.log("Deberia ejecutarse luego de la promesa?")



const obtencionDatos = async () => {
    try{
        const data = await fetchDataFromApi()
        console.log(data)
    }
    catch(e){console.log({error:e})}
}

obtencionDatos()


// 
