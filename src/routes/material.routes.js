import { Router } from "express";
import apicache from "apicache";
import { getMaterial, getMateriales, createMaterial, updateMaterial, deleteMaterial } from "../controllers/material.controller.js";

const router = Router();
const cache = apicache.middleware;

/**
 * @openapi
 * /materiales:
 *   get:
 *     tags:
 *       - Materiales
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
router.get('/materiales', cache("2 minutes"), getMateriales);
router.get('/materiales:id', getMaterial);
router.post('/materiales', createMaterial);
router.put('/materiales:id', updateMaterial);
router.delete('/materiales:id', deleteMaterial);

export default router;