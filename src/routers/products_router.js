import {Router} from 'express';
import ProductManager from '../classes/productManager.js';

const router = Router();

router.get('/', (req, res)=>{
    const {limit}= req.query;
    const p = new ProductManager();
    res.json({productos: p.getProduct(limit)});
});

router.get('/:pid', (req, res)=>{
    try {
        const {pid} = req.params;
        const p = new ProductManager();
        const product = p.getProductById(pid);
        if (!product) {
            res.status(404).json({error: 'Producto no encontrado'});
        } else {
            res.json({productos: product});
        }
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al procesar la solicitud'});
        }
});

router.post('/', (req,res)=>{
    const {title, description, price, thumbnail, code, stock, category, status} = req.body;
    const p = new ProductManager();
    const result = p.addProduct(title, description, price, thumbnail, code, stock, category, status);
    res.json({result});
});

router.put('/:pid', (req,res)=>{
    try {
        const {pid} = req.params;
        const p = new ProductManager();
        const result = p.updateProduct(Number(pid), req.body);
        if (!result) {
            res.status(404).json({error: 'Producto no encontrado'});
        } else {
            res.json({result});
        }
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al procesar la solicitud'});
        }
});

router.delete('/:pid', (req,res)=>{
    try {
        const {pid} = req.params;
        const p = new ProductManager();
        const result = p.deleteProduct(Number(pid));
        if (!result) {
            res.status(404).json({error: 'Producto no encontrado'});
        } else {
            res.json({result});
        }
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al procesar la solicitud'});
        }
});

export default router;