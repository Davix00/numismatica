import { Router } from "express";
import apicache from "apicache";
import { getRol, getRoles, createRol, updateRol, deleteRol } from "../controllers/rol.controller.js";


const router = Router();
const cache = apicache.middleware;

/**
 * @openapi
 * /roles:
 *   get:
 *     tags:
 *       - Roles
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
router.get('/roles', cache("2 minutes"), getRoles);
router.get('/roles:id', getRol);
router.post('/roles', createRol);
router.put('/roles:id', updateRol);
router.delete('/roles:id', deleteRol);

export default router;