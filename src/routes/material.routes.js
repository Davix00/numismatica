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
 *     summary: Obtiene todos los materiales
 *     responses:
 *       200:
 *         description: Lista de todos los materiales
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
 *                       idMaterial:
 *                         type: int
 *                         example: 100
 *                       nombre:
 *                         type: string
 *                         example: "Oro"
 *                     example:
 *                       - idMaterial: 100
 *                         nombre: "Oro"
 *                       - idMaterial: 1002
 *                         nombre: "Plata"
 *                       - idMaterial: 104
 *                         nombre: "Níquel"
 *                       - idMaterial: 106
 *                         nombre: "Aluminio"
 */
router.get('/materiales', cache("2 minutes"), getMateriales);

/**
 * @openapi
 * /materiales{id}:
 *   get:
 *     tags:
 *       - Materiales
 *     summary: Obtiene un material por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del material
 *     responses:
 *       200:
 *         description: Información del material
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
 *                     idMaterial:
 *                       type: int
 *                       example: 100
 *                     nombre:
 *                       type: string
 *                       example: "Hierro"
 */
router.get('/materiales:id', getMaterial);

/**
 * @openapi
 * /materiales:
 *   post:
 *     tags:
 *       - Materiales
 *     summary: Crea un nuevo material
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Acero"
 *     responses:
 *       201:
 *         description: Material creado exitosamente
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
 *                     message:
 *                       type: string
 *                       example: "success"
 *                     id:
 *                       type: int
 *                       example: 108
 */
router.post('/materiales', createMaterial);

/**
 * @openapi
 * /materiales{id}:
 *   put:
 *     tags:
 *       - Materiales
 *     summary: Actualiza un material existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del material
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Oro"
 *     responses:
 *       200:
 *         description: Material actualizado exitosamente
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
router.put('/materiales:id', updateMaterial);

/**
 * @openapi
 * /materiales{id}:
 *   delete:
 *     tags:
 *       - Materiales
 *     summary: Elimina un material existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del material
 *     responses:
 *       200:
 *         description: Material eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Material eliminado"
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
router.delete('/materiales:id', deleteMaterial);

export default router;