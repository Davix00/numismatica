import { Router } from "express";
import apicache from "apicache";
import { getUsuario, getUsuarios, createUsuario, updateUsuario, deleteUsuario } from "../controllers/usuario.controller.js";


const router = Router();
const cache = apicache.middleware;

/**
 * @openapi
 * /usuarios:
 *   get:
 *     tags:
 *       - Usuarios
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
router.get('/usuarios', cache("2 minutes"), getUsuarios);
router.get('/usuarios:id', getUsuario);
router.post('/usuarios', createUsuario);
router.put('/usuarios:id', updateUsuario);
router.delete('/usuarios:id', deleteUsuario);

export default router;