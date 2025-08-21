class Counter{

    contadour = 0 
    
    constructor(nombre,id){
        this.nombre= nombre
        this.id= id
    }

    setTimer(nuevoValor){
        this.contadour = nuevoValor
    }

    getCountadour(){
        return this.contadour
    }

    getViewerTime(ms){
        setInterval(
            () => {
                console.log(++this.contadour);
            }, ms
        )
    }
}



export {Counter};