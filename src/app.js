import express from 'express';
import ProductManager from './productManager.js';

const app = express();
const PORT = 8080;

app.get('/products', (req, res)=>{
    const {limit}= req.query;
    const p = new ProductManager();
    res.json({productos: p.getProduct(limit)});
});

app.get('/products/:pid', (req, res)=>{
    const {pid} = req.params;
    const p = new ProductManager();
    res.json({productos: p.getProductById(pid)});
});

app.listen(PORT, ()=>{
    console.log(`Servidor abierto en el puerto ${PORT}`)
});