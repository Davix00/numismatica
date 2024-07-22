import { Router } from "express";
import apicache from "apicache";
import { getAcabado, getAcabados, createAcabado, updateAcabado, deleteAcabado } from "../controllers/acabado.controller.js";


const router = Router();
const cache = apicache.middleware;

/**
 * @openapi
 * /acabados:
 *   get:
 *     tags:
 *       - Acabados
 *     summary: Obtiene todos los acabados
 *     responses:
 *       200:
 *         description: Lista de todos los acabados
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
 *                       idAcabado:
 *                         type: int
 *                         example: 1245
 *                       nombre:
 *                         type: string
 *                         example: "Acabado Mate"
 *                       descripcion:
 *                         type: string
 *                         example: "Un acabado mate para superficies."
 *                     example:
 *                       - idAcabado: 1245
 *                         nombre: "Acabado Mate"
 *                         descripcion: "Un acabado mate para superficies."
 *                       - idAcabado: 1246
 *                         nombre: "Acabado Brillante"
 *                         descripcion: "Un acabado brillante para superficies."
 *                       - idAcabado: 1247
 *                         nombre: "Acabado Satinado"
 *                         descripcion: "Un acabado satinado para superficies."
 *                       - idAcabado: 1248
 *                         nombre: "Acabado Texturizado"
 *                         descripcion: "Un acabado texturizado para superficies."
 */
router.get('/acabados', cache("2 minutes"), getAcabados);

/**
 * @openapi
 * /acabados{id}:
 *   get:
 *     tags:
 *       - Acabados
 *     summary: Obtiene un acabado por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del acabado
 *     responses:
 *       200:
 *         description: Información del acabado
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
 *                     idAcabado:
 *                       type: int
 *                       example: 100
 *                     nombre:
 *                       type: string
 *                       example: "Acabado Mate"
 *                     descripcion:
 *                       type: string
 *                       example: "Un acabado mate para superficies."
 */
router.get('/acabados:id', getAcabado);

/**
 * @openapi
 * /acabados:
 *   post:
 *     tags:
 *       - Acabados
 *     summary: Crea un nuevo acabado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Acabado Brillante"
 *               descripcion:
 *                 type: string
 *                 example: "Un acabado brillante para superficies."
 *     responses:
 *       201:
 *         description: Acabado creado exitosamente
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
 *                     idAcabado:
 *                       type: int
 *                       example: 67890
 *                     nombre:
 *                       type: string
 *                       example: "Acabado Brillante"
 *                     descripcion:
 *                       type: string
 *                       example: "Un acabado brillante para superficies."
 */
router.post('/acabados', createAcabado);

/**
 * @openapi
 * /acabados{id}:
 *   put:
 *     tags:
 *       - Acabados
 *     summary: Actualiza un acabado existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del acabado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Acabado Satinado"
 *               descripcion:
 *                 type: string
 *                 example: "Un acabado satinado para superficies."
 *     responses:
 *       200:
 *         description: Acabado actualizado exitosamente
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
 */
router.put('/acabados:id', updateAcabado);

/**
 * @openapi
 * /acabados{id}:
 *   delete:
 *     tags:
 *       - Acabados
 *     summary: Elimina un acabado existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del acabado
 *     responses:
 *       200:
 *         description: Acabado eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Acabado eliminado."
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
router.delete('/acabados:id', deleteAcabado);

export default router;