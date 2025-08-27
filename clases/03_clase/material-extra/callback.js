console.log('Inicio del programa')

/* ----------------------------- */
/*       Código sincrónico       */
/* ----------------------------- */
/* const pow = (base,exp) => {
    for(let i=0; i<3e9; i++){}
    return base ** exp
}

let resultado = pow(2,2)
console.log(resultado)

resultado = pow(resultado,2)
console.log(resultado)

resultado = pow(resultado,2)
console.log(resultado)

resultado = pow(resultado,2)
console.log(resultado)

resultado = pow(resultado,2)
console.log(resultado) */



/* ------------------------------------------- */
/*      Código asincrónico con callbacks       */
/* ------------------------------------------- */
const pow = (base,exp,cb) => {
    setTimeout(() => cb(base ** exp), 2000)
}

// Callback hell ó infierno de callbacks ó pirámide de la perdición
pow(2,2, resultado => {
    let a = 777
    console.log(resultado)

    pow(resultado,2, resultado => {
        console.log(resultado)

        pow(resultado,2, resultado => {
            console.log(resultado)

            pow(resultado,2, resultado => {
                console.log(resultado)

                pow(resultado,2, resultado => {
                    console.log(resultado)
                    console.log(a)
                })
            })
        })
    })
})

console.log('Otras tareas...')
