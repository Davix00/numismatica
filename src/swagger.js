import swaggerUI from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"

//Información de los metadatos de nuestra API
const swaggerSpec = {
 definition: {
  openapi: "3.0.0",
   info: {
    title: "Numismática API",
    version: "1.0.0",
    description: "API para gestión de productos y las ventas.",
  },
 },
 apis: ["./src/routes/*.routes.js"]
}

//función que configura la documentación
export const swaggerDocs = (app, port) => {
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));
  console.log(`📚 Documentación de APIS en http://localhost:${port}/api-docs`);
}