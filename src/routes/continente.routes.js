import { Router } from "express";
import apicache from "apicache";
import { getContinente, getContinentes, createContinente, updateContinente, deleteContinente } from "../controllers/continente.controller.js";


const router = Router();
const cache = apicache.middleware;

/**
 * @openapi
 * /continentes:
 *   get:
 *     tags:
 *       - Continentes
 *     summary: Obtiene todos los continentes
 *     responses:
 *       200:
 *         description: Lista de todos los continentes
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
 *                       idContinente:
 *                         type: int
 *                         example: 1
 *                       nombre:
 *                         type: string
 *                         example: "Asia"
 *                     example:
 *                       - idContinente: 1
 *                         nombre: "Asia"
 *                       - idContinente: 2
 *                         nombre: "África"
 *                       - idContinente: 3
 *                         nombre: "América del Norte"
 *                       - idContinente: 4
 *                         nombre: "América del Sur"
 */
router.get('/continentes', cache("2 minutes"), getContinentes);

/**
 * @openapi
 * /continentes{id}:
 *   get:
 *     tags:
 *       - Continentes
 *     summary: Obtiene un continente por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del continente
 *     responses:
 *       200:
 *         description: Información del continente
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
 *                     idContinente:
 *                       type: int
 *                       example: 100
 *                     nombre:
 *                       type: string
 *                       example: "Asia"
 */
router.get('/continentes:id', getContinente);

/**
 * @openapi
 * /continentes:
 *   post:
 *     tags:
 *       - Continentes
 *     summary: Crea un nuevo continente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Antártida"
 *     responses:
 *       201:
 *         description: Continente creado exitosamente
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
 *                       example: 10008
 */
router.post('/continentes', createContinente);

/**
 * @openapi
 * /continentes{id}:
 *   put:
 *     tags:
 *       - Continentes
 *     summary: Actualiza un continente existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del continente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Oceanía"
 *     responses:
 *       200:
 *         description: Continente actualizado exitosamente
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
router.put('/continentes:id', updateContinente);

/**
 * @openapi
 * /continentes{id}:
 *   delete:
 *     tags:
 *       - Continentes
 *     summary: Elimina un continente existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del continente
 *     responses:
 *       200:
 *         description: Continente eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Continente eliminado"
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
router.delete('/continentes:id', deleteContinente);

export default router;