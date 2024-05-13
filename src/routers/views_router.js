import {Router} from 'express';
import { addProduct } from '../controllers/product.controller.js';
import { getProductsService } from '../services/product_service.js';
import {getCartByIdService} from '../services/cart_service.js'

const router = Router();

router.get('/', async (req, res)=>{
    const {payload} = await getProductsService({});
    res.setHeader('Content-Type','text/html');
    res.status(200).render('home', {productos:payload, title: 'Productos'});
});

router.get('/realtimeproducts', (req, res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(200).render('realTimeProducts', {title: 'Real time products'});
});

/*router.post('/realtimeproducts', async (req,res)=>{
    const result = addProduct;
    res.json({result});
});*/

router.get('/chat', (req, res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(200).render('chat', {title: 'Chat'});
});

router.get('/products', async (req, res)=>{
    const result = await getProductsService({...req.query});
    return res.render('products', {title: 'productos', result});
});

router.get('/cart/:cid', async (req, res)=>{
    const {cid}=req.params;
    const cart = await getCartByIdService(cid);
    res.render('cart', {title: 'cart', cart});
});

export default router;