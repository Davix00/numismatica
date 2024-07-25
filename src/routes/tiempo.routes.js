import { Router } from "express";
import apicache from "apicache";
import { getTiempo, getTiempos, createTiempo, updateTiempo, deleteTiempo } from "../controllers/tiempo.controller.js";


const router = Router();
const cache = apicache.middleware;

/**
 * @openapi
 * /tiempos:
 *   get:
 *     tags:
 *       - Tiempos
 *     summary: Obtiene todos los tiempos
 *     responses:
 *       200:
 *         description: Lista de todos los tiempos
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
 *                       idTiempo:
 *                         type: int
 *                         example: 100
 *                       nombre:
 *                         type: string
 *                         example: "Revolución Mexicana"
 *                       descripcion:
 *                         type: string
 *                         example: "Inicio en 1910"
 *                     example:
 *                       - idTiempo: 100
 *                         nombre: "Revolución México"
 *                         descripcion: 102
 *                       - idTiempo: 1002
 *                         nombre: "Virreinato Nueva España"
 *                         descripcion: "Inicio en 1642"
 */
router.get('/tiempos', cache("2 minutes"), getTiempos);

/**
 * @openapi
 * /tiempos{id}:
 *   get:
 *     tags:
 *       - Tiempos
 *     summary: Obtiene un tiempo por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del tiempo
 *     responses:
 *       200:
 *         description: Información del tiempo
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
 *                     idTiempo:
 *                       type: int
 *                       example: 100
 *                     nombre:
 *                       type: string
 *                       example: "Revolución Mexicana"
 *                     descripcion:
 *                       type: string
 *                       example: "Inicio en 1910."
 */
router.get('/tiempos:id', getTiempo);

/**
 * @openapi
 * /tiempos:
 *   post:
 *     tags:
 *       - Tiempos
 *     summary: Crea un nuevo tiempo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Revolución Mexicana"
 *               descripcion:
 *                 type: string
 *                 example: "Empezó en 1910."
 *     responses:
 *       201:
 *         description: Tiempo creado exitosamente
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
 *                     idTiempo:
 *                       type: int
 *                       example: 120
 */
router.post('/tiempos', createTiempo);

/**
 * @openapi
 * /tiempos{id}:
 *   put:
 *     tags:
 *       - Tiempos
 *     summary: Actualiza un tiempo existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del tiempo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Virreinato de Nueva España"
 *               descripcion:
 *                 type: string
 *                 example: "Empezó en  1492"
 *     responses:
 *       200:
 *         description: Tiempo actualizado exitosamente
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
router.put('/tiempos:id', updateTiempo);

/**
 * @openapi
 * /tiempos{id}:
 *   delete:
 *     tags:
 *       - Tiempos
 *     summary: Elimina un tiempo existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del tiempo
 *     responses:
 *       200:
 *         description: Tiempo eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tiempo eliminado."
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
router.delete('/tiempos:id', deleteTiempo);

export default router;