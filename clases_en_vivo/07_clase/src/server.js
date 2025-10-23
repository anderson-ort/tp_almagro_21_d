import express from "express"
import BookRouter from "./router/book.router.js"

const server = express()
server.use(express.json())
server.use("/api/book", BookRouter)

// Catch-all for 404 errors
server.use((req, res, next) => {
  res.status(404).send('No esta disponible este endpoint' + req.url);
});


export default server