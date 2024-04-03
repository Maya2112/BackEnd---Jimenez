import {Router} from 'express';
import CartManager from '../cartManager.js';

const router = Router();

router.get('/:cid', (req, res)=>{
    const c = new CartManager();
    const result = c.getCartById(Number(cid));
    const {cid}=req.params;
    res.json({result});
})

router.post('/', (req, res)=>{
    const c = new CartManager();
    const result = c.CreateCart();
    res.json({result});
})

export default router;