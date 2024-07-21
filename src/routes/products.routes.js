import { Router } from "express";
import { getProduct, getProducts, createProduct, updateProduct, deleteProduct } from "../controllers/products.controllers.js";


const router = Router();

/**
 * @openapi
 * /productos:
 *   get:
 *     tags:
 *       - Productos
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
router.get('/productos', getProducts);

router.get('/productos:id', getProduct);
router.post('/productos', createProduct);
router.put('/productos/:id', updateProduct);
router.delete('/productos/:id', deleteProduct);

export default router;