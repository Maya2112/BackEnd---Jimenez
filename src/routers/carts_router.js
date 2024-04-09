import {Router} from 'express';
import CartManager from '../classes/cartManager.js';

const router = Router();

router.get('/:cid', (req, res)=>{
    try {
        const {cid} = req.params;
        const c = new CartManager();
        const cart = c.getCartById(cid);
            if (!cart) {
                res.status(404).json({error: `El carrito no existe`});
            } else {
                res.json({carritos: cart});
            }
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al procesar la solicitud'});
        }
});

router.post('/', (req, res)=>{
    const c = new CartManager();
    const result = c.createCart();
    res.json({result});
});

router.post('/:cid/product/:pid', (req, res)=>{
    try {
        const {cid, pid}=req.params;
        const c = new CartManager();
        const result = c.addProductToCart(Number (cid), Number (pid));
            if (!result.toCart) {
                res.status(404).json({error: `El carrito o producto solicitado no existe`});
            } else {
                res.json({result});
            }
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al procesar la solicitud'});
        }
});

export default router;