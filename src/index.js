import express from "express";
import apicache from "apicache";
import cors from "cors";
import { config } from "dotenv";
import { swaggerDocs } from "./swagger.js";

//importaciones de las rutas que creemos
import productRoutes from "./routes/products.routes.js" 

//Para inicializar las variables de entorno
config();

//configuraciones del backend
const app = express();
const cache = apicache.middleware;

const port = process.env.PORT || 9000;
app.use(express.json());
app.use(cache("2 minutes"));

//uso de las rutas
app.use(productRoutes);

//middleware
app.use(express.urlencoded({ extended: false }))
app.use(cors())

//ejecución del servidor en le puerto
app.listen(port, () => {
    console.log("🚀 Servidor ejecutándose en el puerto", port);
    swaggerDocs(app, port);
  }
);