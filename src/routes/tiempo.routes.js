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
router.get('/tiempos', cache("2 minutes"), getTiempos);
router.get('/tiempos:id', getTiempo);
router.post('/tiempos', createTiempo);
router.put('/tiempos:id', updateTiempo);
router.delete('/tiempos:id', deleteTiempo);

export default router;