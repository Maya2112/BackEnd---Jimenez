import {Router} from 'express';
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/product.controller.js';
import { admin } from '../middleware/auth.js';

const router = Router();

router.get('/', getProducts);
router.get('/:pid', admin, getProductById);
router.post('/', admin, addProduct);
router.put('/:pid',admin, updateProduct);
router.delete('/:pid',admin, deleteProduct);

export default router;