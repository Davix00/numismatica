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
router.get('/acabados', cache("2 minutes"), getAcabados);
router.get('/acabados:id', getAcabado);
router.post('/acabados', createAcabado);
router.put('/acabados:id', updateAcabado);
router.delete('/acabados:id', deleteAcabado);

export default router;