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
 *     responses:
 *       200:
 *         description: OK
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
 */
router.get('/tipos', cache("2 minutes"), getTipos);
router.get('/tipos:id', getTipo);
router.post('/tipos', createTipo);
router.put('/tipos:id', updateTipo);
router.delete('/tipos:id', deleteTipo);

export default router;