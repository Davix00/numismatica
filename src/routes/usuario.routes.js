import { Router } from "express";
import apicache from "apicache";
import { getUsuario, getUsuarios, createUsuario, updateUsuario, deleteUsuario } from "../controllers/usuario.controller.js";


const router = Router();
const cache = apicache.middleware;

/**
 * @openapi
 * /usuarios:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Obtiene todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de todos los usuarios
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
 *                       idUsuario:
 *                         type: int
 *                         example: 1245
 *                       nombre:
 *                         type: string
 *                         example: "David"
 *                       apellido:
 *                         type: string
 *                         example: "Galavíz"
 *                       correo:
 *                         type: string
 *                         example: "davidgalaviz@gmail.com"
 *                       contra:
 *                         type: string
 *                         example: "contrasena1234"
 *                       idRol:
 *                         type: string
 *                         example: "Moneda"
 *                     example:
 *                       - idUsuario: 1246
 *                         nombre: "David"
 *                         apellido: "Galavíz"
 *                         correo: "david@mail.com"
 *                         contra: "kalimba"
 *                         idRol: 1
 *                       - idUsuario: 1247
 *                         nombre: "Jorge"
 *                         apellido: "Galavíz"
 *                         correo: "jorge@mail.com"
 *                         contra: "frijol"
 *                         idRol: 1
 *                       - idUsuario: 1248
 *                         nombre: "Ana"
 *                         apellido: "Galavíz"
 *                         correo: "ana@mail.com"
 *                         contra: "rafa"
 *                         idRol: 1
 */
router.get('/usuarios', cache("2 minutes"), getUsuarios);

 /**
 * @openapi
 * /usuarios{id}:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Obtiene un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del usuario
 *     responses:
 *       200:
 *         description: Información del usuario
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
 *                     idUsuario:
 *                       type: int
 *                       example: 100
 *                     nombre:
 *                       type: string
 *                       example: "David"
 *                     apellido:
 *                       type: string
 *                       example: "Galavíz"
 *                     correo:
 *                       type: string
 *                       example: "davidgalaviz@gmail.com"
 *                     contra:
 *                       type: string
 *                       example: "kalimba"
 *                     idRol:
 *                       type: int
 *                       example: 2
*/
router.get('/usuarios:id', getUsuario);

/**
 * @openapi
 * /usuarios:
 *   post:
 *     tags:
 *       - Usuarios
 *     summary: Crea un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "David"
 *               apellido:
 *                 type: string
 *                 example: "Galavíz"
 *               correo:
 *                 type: string
 *                 example: "davidgalaviz@gmail.com"
 *               contra:
 *                 type: string
 *                 example: "kalimba"
 *               idRol:
 *                 type: int
 *                 example: 1232
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
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
 *                     message:
 *                       type: string
 *                       example: "success"
 *                     id:
 *                       type: int
 *                       example: 108
 */
router.post('/usuarios', createUsuario);

router.put('/usuarios:id', updateUsuario);
router.delete('/usuarios:id', deleteUsuario);

export default router;