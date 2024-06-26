import {Router} from 'express';
import { addProductToCart, createCart, getCartById, deleteCartProduct, updateCartProduct, deleteAllProductCart } from '../controllers/cart.controller.js';
import { auth, admin } from '../middleware/auth.js';
import { createTicket } from '../controllers/ticket.controller.js';

const router = Router();

router.get('/:cid', getCartById);
router.post('/', createCart);
router.post('/:cid/products/:pid', auth, addProductToCart);
router.delete('/:cid/products/:pid', auth, deleteCartProduct);
router.put('/:cid/products/:pid', auth, updateCartProduct);
router.delete('/:cid', auth, deleteAllProductCart);
router.post('/:cid/purchase', createTicket);

export default router;