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
router.get('/continentes', cache("2 minutes"), getContinentes);
router.get('/continentes:id', getContinente);
router.post('/continentes', createContinente);
router.put('/continentes:id', updateContinente);
router.delete('/continentes:id', deleteContinente);

export default router;