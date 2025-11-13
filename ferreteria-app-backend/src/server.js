import path from 'path'
import morgan from 'morgan'
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';


import express from "express"
import ProductAllRouter from "./router/product.all.router.js"
import ProductRouter from "./router/product.crud.router.js"
import notFoundHandler from "./middleware/notFoundHandler.js"
import ApiUserRouter from "./router/user.route.js"
import WelcomeRouter from "./router/welcome.router.js"
import { apiReference } from '@scalar/express-api-reference'

const server = express()
// rate limiter

// Set up rate limiter: maximum of 50 requests per minute
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 50,
});
// Apply rate limiter to all requests
server.use(limiter);


// cors
server.use(cors())


const morganFormat = morgan(':method :url :status :res[content-length] - :response-time ms')

server.use(express.json())

server.use(morganFormat)

server.use('/openapi.yml', express.static(path.join(process.cwd(), 'openapi.yml')));

server.use('/docs',
  apiReference({
    theme: 'purple',
    url: '/openapi.yml',
  }),
)

// presentacion del server
server.use("/", WelcomeRouter)

// user authentication by JWT --> login | signup --> 
server.use("/api/user", ApiUserRouter)

// protected -> Que usuario tiene permiso de acceso, que metodo? JWT -> (supabase)
server.use("/api/v1/products", ProductAllRouter)

// semi-protected
server.use("/api/v1/product", ProductRouter)

// not found
server.use(notFoundHandler)

export default server