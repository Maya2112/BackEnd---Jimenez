import {Router} from 'express';
import {productModel} from '../models/products.js'
import { addProduct } from '../controllers/product.controller.js';

const router = Router();

router.get('/', async (req, res)=>{
    const productos = await productModel.find().lean();
    res.setHeader('Content-Type','text/html');
    res.status(200).render('home', {productos, title: 'Productos'});
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

export default router;