import { config } from "dotenv";
import express from "express";
//import swaggerUI from "swagger-ui-express"
//import swaggerJsDoc from "swagger-jsdoc"

//imports from routes
import productRoutes from "./routes/products.routes.js" 

//enviroment varidbles
config();

//settings
const app = express();
const port = process.env.PORT || 9000;
app.use(express.json());

//use routes
app.use(productRoutes);

//middleware
//app.use("/api-doc",swaggerUI.setup(swaggerJsDoc()));

//sever listening
app.listen(port, () => console.log("Servidor eschuchando por el puerto:", port));