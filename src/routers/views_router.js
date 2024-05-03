import {Router} from 'express';
//import ProductManager from '../classes/productManager.js';
import {productModel} from '../models/products.js'

const router = Router();

//const p = new ProductManager();


router.get('/', async (req, res)=>{
    const productos = await productModel.find();
    res.setHeader('Content-Type','text/html');
    res.status(200).render('home', {productos, titulo: "Productos"});
});

router.get('/realtimeproducts', (req, res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(200).render('realTimeProducts');
});

router.post('/realtimeproducts', (req,res)=>{
    const result = p.addProduct(...req.body);
    res.json({result});
});

export default router;