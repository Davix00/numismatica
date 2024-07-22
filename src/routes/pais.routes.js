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
router.get('/paises', cache("2 minutes"), getPaises);
router.get('/paises:id', getPais);
router.post('/paises', createPais);
router.put('/paises:id', updatePais);
router.delete('/paises:id', deletePais);

export default router;