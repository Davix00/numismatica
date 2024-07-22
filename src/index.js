import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { swaggerDocs } from "./swagger.js";

//importaciones de las rutas que creemos
import productoRoutes from "./routes/producto.routes.js" ;
import acabadoRoutes from "./routes/acabado.routes.js";
import continenteRoutes from "./routes/continente.routes.js";
import emisorRoutes from "./routes/emisor.routes.js";
import materialRoutes from "./routes/material.routes.js";
import paisRoutes from "./routes/pais.routes.js";
import tiempoRoutes from "./routes/tiempo.routes.js";


//Para inicializar las variables de entorno
config();

//configuraciones del backend
const app = express();
const port = process.env.PORT || 9000;
app.use(express.json());

//uso de las rutas
app.use(productoRoutes);
app.use(acabadoRoutes);
app.use(continenteRoutes);
app.use(emisorRoutes);
app.use(materialRoutes);
app.use(paisRoutes);
app.use(tiempoRoutes);

//middleware
app.use(express.urlencoded({ extended: false }))
app.use(cors())

//ejecución del servidor en le puerto
app.listen(port, () => {
    console.log("🚀 Servidor ejecutándose en el puerto", port);
    swaggerDocs(app, port);
  }
);