import {Router} from 'express';
import CartManager from '../classes/cartManager.js';

const router = Router();

router.get('/:cid', (req, res)=>{
    const {cid}=req.params;
    const c = new CartManager();
    const result = c.getCartById(Number(cid));
    res.json({result});
});

router.post('/', (req, res)=>{
    const c = new CartManager();
    const result = c.createCart();
    res.json({result});
});

router.post('/:cid/product/:pid', (req, res)=>{
    const {cid, pid}=req.params;
    const c = new CartManager();
    const result = c.addProductToCart(Number (cid), Number (pid));
    res.json({result});
});

export default router;