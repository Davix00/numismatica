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
router.get('/emisores', cache("2 minutes"), getEmisores);
router.get('/emisores:id', getEmisor);
router.post('/emisores', createEmisor);
router.put('/emisores:id', updateEmisor);
router.delete('/emisores:id', deleteEmisor);

export default router;