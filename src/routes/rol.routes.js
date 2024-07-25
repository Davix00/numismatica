import { Router } from "express";
import apicache from "apicache";
import { getRol, getRoles, createRol, updateRol, deleteRol } from "../controllers/rol.controller.js";


const router = Router();
const cache = apicache.middleware;

/**
 * @openapi
 * /roles:
 *   get:
 *     tags:
 *       - Roles
 *     summary: Obtiene todos los roles
 *     responses:
 *       200:
 *         description: Lista de todos los roles
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
 *                       idRol:
 *                         type: int
 *                         example: 1245
 *                       nombre:
 *                         type: string
 *                         example: "Administrador"
 *                       descripcion:
 *                         type: string
 *                         example: "Tiene todos los permisos."
 *                     example:
 *                       - idRol: 1245
 *                         nombre: "Administrador"
 *                         descripcion: "Tiene todos los permisos."
 *                       - idRol: 1246
 *                         nombre: "Usuario"
 *                         descripcion: "Solo puede ver los productos."
 *                       - idRol: 1246
 *                         nombre: "Comprador"
 *                         descripcion: "Ya puede compar y agregar cosas al carrito."
 */
router.get('/roles', cache("2 minutes"), getRoles);

/**
 * @openapi
 * /roles{id}:
 *   get:
 *     tags:
 *       - Roles
 *     summary: Obtiene un rol por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del rol a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rol obtenido exitosamente
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
 *                     idProducto:
 *                       type: int
 *                       example: 100
 *                     nombre:
 *                       type: string
 *                       example: "Administrador"
 *                     descripcion:
 *                       type: string
 *                       example: "Tiene todos los permisos."
 */
router.get('/roles:id', getRol);

/**
 * @openapi
 * /roles:
 *   post:
 *     tags:
 *       - Roles
 *     summary: Crea un nuevo rol
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nombre:
 *                 type: string
 *                 example: "Administrador"
 *               rol:
 *                 type: string
 *                 example: "Tiene todos los permisos"
 *     responses:
 *       201:
 *         description: Rol creado exitosamente
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
 *                     id:
 *                       type: int
 *                       example: 1234
 */
router.post('/roles', createRol);

/**
 * @openapi
 * /roles{id}:
 *   put:
 *     tags:
 *       - Roles
 *     summary: Actualizar un rol por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del rol a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Administrador"
 *               rol:
 *                 type: string
 *                 example: "Tiene todos los permisos."
 *     responses:
 *       200:
 *         description: Rol actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "success"
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
router.put('/roles:id', updateRol);

/**
 * @openapi
 * /roles{id}:
 *   delete:
 *     tags:
 *       - Roles
 *     summary: Elimina un rol existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del rol
 *     responses:
 *       200:
 *         description: Rol eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Rol eliminado"
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
router.delete('/roles:id', deleteRol);

export default router;