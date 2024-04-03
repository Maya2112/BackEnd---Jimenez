import express from 'express';
import product from './routers/products_router.js';
import cart from './routers/carts_router.js';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res)=>{
    res.send('Primera Pre Entrega');
});
app.use('/api/products', product);
app.use('/api/carts', cart);



app.listen(PORT, ()=>{
    console.log(`Servidor abierto en el puerto ${PORT}`)
});