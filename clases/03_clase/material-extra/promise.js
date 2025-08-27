
console.log('Inicio del programa')


/* ------------------------------------------- */
/*      Código asincrónico con promesas        */
/* ------------------------------------------- */
//https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise
const pow = (base,exp) => {
    return new Promise((resolve, reject) => {
        if(typeof base == 'number' && typeof exp == 'number') {
            setTimeout(() => resolve(base ** exp), 2000)
        }
        else {
            reject('Los parámetros son incorrectos')
        }
    })
}

// ----------- Promesas anidadas con interface then/catch -----------
/* pow(2,2)
    .then( resultado => {
        console.log(resultado)
        return pow(resultado,2)
    })
    .then( resultado => {
        console.log(resultado)
        return pow(resultado,2)
    })
    .then( resultado => {
        console.log(resultado)
        //throw 'Acá tengo que salir!!!'
        return pow(resultado,2)
    })
    .then( resultado => {
        console.log(resultado)
        return pow(resultado,2)
    })
    .then( resultado => {
        console.log(resultado)
    })
    .catch( error => console.log(error) ) */


// ----------- Promesas anidadas con interface async/await -----------
//async function calcular() {
//const calcular = async function() {
const calcular = async () => {
    try {
        let resultado = await pow(2,2)
        console.log(resultado)

        resultado = await pow(resultado,2)
        console.log(resultado)

        resultado = await pow(resultado,2)
        console.log(resultado)
        
        resultado = await pow(resultado,2)
        console.log(resultado)
        
        resultado = await pow(resultado,2)
        console.log(resultado)
    }
    catch(error) {
        console.log(error)
    }
}

calcular()

console.log('Otras tareas...')


/* setInterval(() => {
    console.log(new Date().toLocaleString())
},3000) */
