import { Router } from "express";
import apicache from "apicache";
import { getProduct, getProducts, createProduct, updateProduct, deleteProduct } from "../controllers/products.controllers.js";


const router = Router();
const cache = apicache.middleware;

/**
 * @openapi
 * /productos:
 *   get:
 *     tags:
 *       - Productos
 *     summary: Obtiene todos los productos
 *     responses:
 *       200:
 *         description: Lista de todos los productos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 *                     properties:
 *                       idProducto:
 *                         type: int
 *                         example: 100
 *                       nombre:
 *                         type: string
 *                         example: "Moneda de 20 pesos del virreinato"
 *                       fechaEmision:
 *                         type: string
 *                         example: "1999/12/01"
 *                       precio:
 *                         type: float
 *                         example: 25000.89
 *                       cantidad:
 *                         type: int
 *                         example: 2
 *                       medidas:
 *                         type: string
 *                         example: "3 cm de diámetro y 2 milímetros de ancho."
 *                       detalles:
 *                         type: string
 *                         example: "Ninguno"
 *                       pureza:
 *                         type: float
 *                         example: 99.9
 *                       idTiempo:
 *                         type: int
 *                         example: 100
 *                       idAcabado:
 *                         type: int
 *                         example: 100
 *                       idPais:
 *                         type: int
 *                         example: 100
 *                       idEmisor:
 *                         type: int
 *                         example: 100
 *                       idMaterial:
 *                         type: int
 *                         example: 100
 *                       idTipo:
 *                         type: int
 *                         example: 100
 *                       idTransaccion:
 *                         type: int
 *                         example: 100
 *                     example:
 *                       - idProducto: 100
 *                         nombre: "Moneda de 20 pesos del virreinato"
 *                         fechaEmision: "1899/03/23"
 *                         precio: 25000.89
 *                         cantidad: 1 2
 *                         medidas: "3 cm de diámetro y 2 milímetros de ancho."
 *                         detalles: "Ninguno"          
 *                         pureza: 97.3
 *                         idTiempo: 100
 *                         idAcabado: 100
 *                         idPais: 100
 *                         idEmisor: 100
 *                         idMaterial: 100
 *                         idTipo: 1
 *                         idTransaccion: 100
 *                       - idProducto: 104
 *                         nombre: "Billete de 100 pesos mexicanos"
 *                         fechaEmision: "2023/05/12"
 *                         precio: 100.00
 *                         cantidad: 3
 *                         medidas: "14.6 cm de largo y 6.6 cm de ancho."
 *                         detalles: "Circulación regular"
 *                         pureza: null
 *                         idTiempo: 103
 *                         idAcabado: null
 *                         idPais: 103
 *                         idEmisor: null
 *                         idMaterial: 102
 *                         idTipo: 5
 *                         idTransaccion: 104
 *                       - idProducto: 105
 *                         nombre: "Moneda de plata de 1 onza"
 *                         fechaEmision: "2022/09/18"
 *                         precio: 30.75
 *                         cantidad: 20
 *                         medidas: "3.5 cm de diámetro."
 *                         detalles: "Edición conmemorativa"
 *                         pureza: 99.9
 *                         idTiempo: null
 *                         idAcabado: 103
 *                         idPais: null
 *                         idEmisor: 103
 *                         idMaterial: 103
 *                         idTipo: 6
 *                         idTransaccion: 105
 *                       - idProducto: 106
 *                         nombre: "Billete de 20 euros"
 *                         fechaEmision: "2023/01/05"
 *                         precio: 20.00
 *                         cantidad: 5
 *                         medidas: "13.2 cm de largo y 7.3 cm de ancho."
 *                         detalles: "Nueva serie"
 *                         pureza: null
 *                         idTiempo: 104
 *                         idAcabado: null
 *                         idPais: 104
 *                         idEmisor: null
 *                         idMaterial: 104
 *                         idTipo: 5
 *                         idTransaccion: 106
 *                       - idProducto: 107
 *                         nombre: "Moneda de oro de 1/4 de onza"
 *                         fechaEmision: "2023/04/30"
 *                         precio: 400.00
 *                         cantidad: 2
 *                         medidas: "2 cm de diámetro."
 *                         detalles: "Certificado de autenticidad incluido"
 *                         pureza: 99.99
 *                         idTiempo: null
 *                         idAcabado: 105
 *                         idPais: null
 *                         idEmisor: 104
 *                         idMaterial: 105
 *                         idTipo: 6
 *                         idTransaccion: 107
 */
router.get('/productos', cache("2 minutes") ,getProducts);

/**
 * @openapi
 * /productos{id}:
 *   get:
 *     tags:
 *       - Productos
 *     summary: Obtiene un producto por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto existente
 *     responses:
 *       200:
 *         description: Datos del producto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idProducto:
 *                   type: int
 *                   example: 100
 *                 nombre:
 *                   type: string
 *                   example: "Moneda de 20 pesos del virreinato"
 *                 fechaEmision:
 *                   type: string
 *                   example: "1999/12/01"
 *                 precio:
 *                   type: float
 *                   example: 25000.89
 *                 cantidad:
 *                   type: int
 *                   example: 2
 *                 medidas:
 *                   type: string
 *                   example: "3 cm de diámetro y 2 milímetros de ancho."
 *                 detalles:
 *                   type: string
 *                   example: "Ninguno"
 *                 pureza:
 *                   type: float
 *                   example: 99.9
 *                 idTiempo:
 *                   type: int
 *                   example: 100
 *                 idAcabado:
 *                   type: int
 *                   example: 100
 *                 idPais:
 *                   type: int
 *                   example: 100
 *                 idEmisor:
 *                   type: int
 *                   example: 100
 *                 idMaterial:
 *                   type: int
 *                   example: 100
 *                 idTipo:
 *                   type: int
 *                   example: 100
 *                 idTransaccion:
 *                   type: int
 *                   example: 100
 */
router.get('/productos:id', getProduct);


/**
 * @openapi
 * /productos:
 *   post:
 *     tags:
 *       - Productos
 *     summary: Crea un nuevo producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Moneda de 20 pesos del virreinato"
 *               fechaEmision:
 *                 type: string
 *                 example: "1999/12/01"
 *               precio:
 *                 type: float
 *                 example: 25000.89
 *               cantidad:
 *                 type: int
 *                 example: 2
 *               medidas:
 *                 type: string
 *                 example: "3 cm de diámetro y 2 milímetros de ancho."
 *               detalles:
 *                 type: string
 *                 example: "Ninguno"
 *               pureza:
 *                 type: float
 *                 example: 99.9
 *               idTiempo:
 *                 type: int
 *                 example: 100
 *               idAcabado:
 *                 type: int
 *                 example: 100
 *               idPais:
 *                 type: int
 *                 example: 100
 *               idEmisor:
 *                 type: int
 *                 example: 100
 *               idMaterial:
 *                 type: int
 *                 example: 100
 *               idTipo:
 *                 type: int
 *                 example: 100
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Created
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: int
 *                       example: 100
 */
router.post('/productos', createProduct);

 /** 
 * @openapi
 * /productos{id}:
 *   put:
 *     tags:
 *       - Productos
 *     summary: Actualiza un producto existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Moneda del virreinato de 50 pesos"
 *               fechaEmision:
 *                 type: string
 *                 example: "2024/07/24"
 *               precio:
 *                 type: float
 *                 example: 150.00
 *               cantidad:
 *                 type: int
 *                 example: 2
 *               medidas:
 *                 type: string
 *                 example: "12 cm de alto y 6 cm de ancho"
 *               detalles:
 *                 type: string
 *                 example: "Detalles actualizados del producto"
 *               pureza:
 *                 type: float
 *                 example: 98.5
 *               idTiempo:
 *                 type: int
 *                 example: 102
 *               idAcabado:
 *                 type: int
 *                 example: 102
 *               idPais:
 *                 type: int
 *                 example: 102
 *               idEmisor:
 *                 type: int
 *                 example: 102
 *               idMaterial:
 *                 type: int
 *                 example: 102
 *               idTipo:
 *                 type: int
 *                 example: 3
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "success"
 *       400:
 *         description: Solicitud incorrecta debido a datos no válidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Bad Request
 *                 message:
 *                   type: string
 *                   example: "Los datos proporcionados no son válidos."
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Internal Server Error
 *                 message:
 *                   type: string
 *                   example: "Ocurrió un error inesperado."
 */
router.put('/productos:id', updateProduct);

/**
 * @openapi
 * /productos{id}:
 *   delete:
 *     tags:
 *       - Productos
 *     summary: Elimina un producto existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Producto eliminado"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Internal Server Error
 *                 message:
 *                   type: string
 *                   example: "Ocurrió un error inesperado."
 */
router.delete('/productos:id', deleteProduct);

export default router;