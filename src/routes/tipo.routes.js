import { Router } from "express";
import apicache from "apicache";
import { getTipo, getTipos, createTipo, updateTipo, deleteTipo } from "../controllers/tipo.controller.js";


const router = Router();
const cache = apicache.middleware;

/**
 * @openapi
 * /tipos:
 *   get:
 *     tags:
 *       - Tipos
 *     summary: Obtiene todos los tipos
 *     responses:
 *       200:
 *         description: Lista de todos los tipos
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
 *                       idTipo:
 *                         type: int
 *                         example: 1245
 *                       nombre:
 *                         type: string
 *                         example: "Moneda"
 *                     example:
 *                       - idTipo: 1245
 *                         nombre: "Moneda"
 *                       - idTipo: 1246
 *                         nombre: "Billete"
 */
router.get('/tipos', cache("2 minutes"), getTipos);

/**
 * @openapi
 * /tipos{id}:
 *   get:
 *     tags:
 *       - Tipos
 *     summary: Obtiene un tipo por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del tipo
 *     responses:
 *       200:
 *         description: Información del tipo
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
 *                     idTipo:
 *                       type: int
 *                       example: 100
 *                     nombre:
 *                       type: string
 *                       example: "Moneda"
 */
router.get('/tipos:id', getTipo);

/**
 * @openapi
 * /tipos:
 *   post:
 *     tags:
 *       - Tipos
 *     summary: Crea un nuevo tipo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Medallas"
 *     responses:
 *       201:
 *         description: Tipo creado exitosamente
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
router.post('/tipos', createTipo);

/**
 * @openapi
 * /tipos{id}:
 *   put:
 *     tags:
 *       - Tipos
 *     summary: Actualiza un tipo existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del tipo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Medalla"
 *     responses:
 *       200:
 *         description: Tipo actualizado exitosamente
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
router.put('/tipos:id', updateTipo);

/**
 * @openapi
 * /tipos{id}:
 *   delete:
 *     tags:
 *       - Tipos
 *     summary: Elimina un tipo existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del tipo
 *     responses:
 *       200:
 *         description: Tipo eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tipo eliminado"
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
router.delete('/tipos:id', deleteTipo);

export default router;