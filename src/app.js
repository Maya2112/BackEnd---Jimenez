import express from 'express';
import {engine} from 'express-handlebars';
import {Server} from 'socket.io';
import __dirname from './utils.js';
import productRouter from './routers/products_router.js';
import viewsRouter  from './routers/views_router.js'
//import cart from './routers/carts_router.js';
//import ProductManager from './classes/productManager.js';
import { dbConnection } from './database/config.js';
import { productModel } from './models/products.js';

const app = express();
const PORT = 8080;

//const p= new ProductManager();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + '/views');

app.use('/', viewsRouter);
app.use('/api/products', productRouter);
//app.use('/api/realTimeProducts', productRouter);
//app.use('/api/carts', cart);

await dbConnection();

const serverHTTP= app.listen(PORT, ()=>{console.log(`Servidor online en el puerto ${PORT}`)});
const socketServer = new Server (serverHTTP);

socketServer.on('connection', async (socket)=>{

    const productos = await productModel.find();
    socket.emit('productos', productos);

    socket.on('agregarProducto', producto =>{
        const newProduct = productModel.create({...producto});
        if(newProduct){
            productos.push(newProduct);
            socket.emit('productos', productos);
        }
    });
})