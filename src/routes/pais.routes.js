import { Router } from "express";
import apicache from "apicache";
import { getPais, getPaises, createPais, updatePais, deletePais } from "../controllers/pais.controller.js";


const router = Router();
const cache = apicache.middleware;

/**
 * @openapi
 * /paises:
 *   get:
 *     tags:
 *       - Paises
 *     summary: Obtiene todos los paises
 *     responses:
 *       200:
 *         description: Lista de todos los paises
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
 *                       idPais:
 *                         type: int
 *                         example: 100
 *                       nombre:
 *                         type: string
 *                         example: "México"
 *                       idContinente:
 *                         type: int
 *                         example: 100
 *                     example:
 *                       - idPais: 100
 *                         nombre: "México"
 *                         idContinente: 102
 *                       - idPais: 1002
 *                         nombre: "Brasil"
 *                         idContiente: 104
 *                       - idPais: 1004
 *                         nombre: "Nuevo Mexico"
 *                         idContinente: 106
 */
router.get('/paises', cache("2 minutes"), getPaises);

/**
 * @openapi
 * /paises{id}:
 *   get:
 *     tags:
 *       - Paises
 *     summary: Obtiene un país por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del país
 *     responses:
 *       200:
 *         description: Información del país
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
 *                     idPais:
 *                       type: int
 *                       example: 100
 *                     nombre:
 *                       type: string
 *                       example: "Nuevo México"
 *                     idContinente:
 *                       type: int
 *                       example: 102
 */
router.get('/paises:id', getPais);

/**
 * @openapi
 * /paises:
 *   post:
 *     tags:
 *       - Paises
 *     summary: Crea un nuevo país
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "México"
 *               idContinente:
 *                 type: string
 *                 example: 102
 *     responses:
 *       201:
 *         description: Pais creado exitosamente
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
router.post('/paises', createPais);

/**
 * @openapi
 * /paises{id}:
 *   put:
 *     tags:
 *       - Paises
 *     summary: Actualiza un país existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del país
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "México"
 *               idContinente:
 *                 type: int
 *                 example: 104
 *     responses:
 *       200:
 *         description: País actualizado exitosamente
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
router.put('/paises:id', updatePais);

/**
 * @openapi
 * /paises{id}:
 *   delete:
 *     tags:
 *       - Paises
 *     summary: Elimina un país existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del país
 *     responses:
 *       200:
 *         description: País eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "País eliminado"
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
router.delete('/paises:id', deletePais);

export default router;