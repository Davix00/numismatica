import { Router } from "express";
import apicache from "apicache";
import { getEmisor, getEmisores, createEmisor, updateEmisor, deleteEmisor } from "../controllers/emisor.controller.js";


const router = Router();
const cache = apicache.middleware;

/**
 * @openapi
 * /emisores:
 *   get:
 *     tags:
 *       - Emisores
 *     summary: Obtiene todos los emisores
 *     responses:
 *       200:
 *         description: Lista de todos los emisores
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
 *                       idEmisor:
 *                         type: int
 *                         example: 1245
 *                       nombre:
 *                         type: string
 *                         example: "Banco Mundial"
 *                       descripcion:
 *                         type: string
 *                         example: "Banco mundial en 1899."
 *                     example:
 *                       - idEmisor: 100
 *                         nombre: "Casa de moneda Francia"
 *                         descripcion: "La cas de moneda en Paris 1789"
 *                       - idEmisor: 1002
 *                         nombre: "Virreinato México"
 *                         descripcion: "Un acabado brillante para superficies."
 *                       - idEmisor: 1004
 *                         nombre: "Casa de moneda México"
 *                         descripcion: ""
 */
router.get('/emisores', cache("2 minutes"), getEmisores);

/**
 * @openapi
 * /emisores{id}:
 *   get:
 *     tags:
 *       - Emisores
 *     summary: Obtiene un emisor por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del emisor
 *     responses:
 *       200:
 *         description: Información del emisor
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
 *                     idEmisor:
 *                       type: int
 *                       example: 100
 *                     nombre:
 *                       type: string
 *                       example: "Banco de USA"
 *                     descripcion:
 *                       type: string
 *                       example: "Banco nacional de usa fundado en 1971"
 */
router.get('/emisores:id', getEmisor);

/**
 * @openapi
 * /emisores:
 *   post:
 *     tags:
 *       - Emisores
 *     summary: Crea un nuevo emisor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Casa de moneda México"
 *               descripcion:
 *                 type: string
 *                 example: "Fundada por el 11 de Mayo de 1535"
 *     responses:
 *       201:
 *         description: Emisor creado exitosamente
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
router.post('/emisores', createEmisor);

/**
 * @openapi
 * /emisores{id}:
 *   put:
 *     tags:
 *       - Emisores
 *     summary: Actualiza un emisor existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del emisor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Banco Mundial"
 *               descripcion:
 *                 type: string
 *                 example: "Fundado el 27 de diciembre de 1945"
 *     responses:
 *       200:
 *         description: Emisor actualizado exitosamente
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
router.put('/emisores:id', updateEmisor);

/**
 * @openapi
 * /emisores{id}:
 *   delete:
 *     tags:
 *       - Emisores
 *     summary: Elimina un emisor existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del emisor
 *     responses:
 *       200:
 *         description: Emisor eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Emisor eliminado"
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
router.delete('/emisores:id', deleteEmisor);

export default router;