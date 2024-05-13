import {Router} from 'express';
import { addProductToCart, createCart, getCartById, deleteCartProduct, updateCartProduct, deleteAllProductCart } from '../controllers/cart.controller.js';

const router = Router();

router.get('/:cid', getCartById);
router.post('/', createCart);
router.post('/:cid/products/:pid', addProductToCart);
router.delete('/:cid/products/:pid', deleteCartProduct);
router.put('/:cid/products/:pid', updateCartProduct);
router.delete('/:cid', deleteAllProductCart);

export default router;