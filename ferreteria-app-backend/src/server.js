import express from "express"
import ProductAllRouter from "./router/product.all.router.js"
import ProductRouter from "./router/producto.router.js"

const server = express()
server.use(express.json())


server.get("/", (req, res) => {

    res.json({
        message: "Bienvenidos a la api de ferreteria",
        status: "OK"
    })

})


server.use("/api/all_products", ProductAllRouter)

server.use("/api/products", ProductRouter)

server.use((req, res, next) => {
    res.status(404).send('No esta disponible este endpoint' + req.url);
});


export default server