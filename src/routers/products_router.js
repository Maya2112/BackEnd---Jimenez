import {Router} from 'express';
import ProductManager from '../productManager.js';

const router = Router();

router.get('/', (req, res)=>{
    const {limit}= req.query;
    const p = new ProductManager();
    res.json({productos: p.getProduct(limit)});
});

router.get('/:pid', (req, res)=>{
    const {pid} = req.params;
    const p = new ProductManager();
    res.json({productos: p.getProductById(pid)});
});

router.post('/', (req,res)=>{
    const {title, description, price, thumbnail, code, stock, category, status} = req.body;
    const p = new ProductManager();
    const result = p.addProduct(title, description, price, thumbnail, code, stock, category, status);
    res.json({result});
});

router.put('/:pid', (req,res)=>{
    const {pid} = req.params;
    const p = new ProductManager();
    const result = p.updateProduct(Number(pid), req.body);
    res.json({result});
});

router.delete('/:pid', (req,res)=>{
    const {pid} = req.params;
    const p = new ProductManager();
    const result = p.deleteProduct(Number(pid));
    res.json({result});
});

export default router;