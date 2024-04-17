import {Router} from 'express';
import ProductManager from '../classes/productManager.js';

const router = Router();

const p = new ProductManager();


router.get('/', (req, res)=>{
    const productos = p.getProduct();
    res.setHeader('Content-Type','text/html');
    res.status(200).render('home', {productos, titulo: "Productos"});
});

router.get('/realtimeproducts', (req, res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(200).render('realTimeProducts');
});

export default router;