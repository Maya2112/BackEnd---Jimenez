import express from 'express';
import {engine} from 'express-handlebars';
import {Server} from 'socket.io';
import __dirname from './utils.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import productRouter from './routers/products_router.js';
import viewsRouter  from './routers/views_router.js'
import cart from './routers/carts_router.js';
import { dbConnection } from './database/config.js';
import { messageModel } from './models/messages.js';
import { addProductService, getProductsService } from './services/product_service.js';
import { initializaPassport } from './config/passport.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger, middLogger, loggerRoute } from "./utils/logger.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

app.use(session({
    store: MongoStore.create({
        mongoUrl: `${process.env.URI_ECOMMERCE_MONGODB}/${process.env.DB_NAME}`,
        ttl: 3600
    }),
    secret: process.env.SECRET_SESSION,
    saveUninitialized: true,
    resave: false,
}));

//Passport
initializaPassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(middLogger);
app.use(cookieParser());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + '/views');

app.use('/', viewsRouter);
app.use('/api/products', productRouter);
app.use('/api/realTimeProducts', productRouter);
app.use('/api/carts', cart);
app.use("/loggerTest", loggerRoute);
app.use(errorHandler);

await dbConnection();

const serverHTTP= app.listen(PORT, ()=>{logger.info(`Servidor online en el puerto ${PORT}`)});
const socketServer = new Server (serverHTTP);

socketServer.on('connection', async (socket)=>{

    //Productos
    const limit = 50;
    const {payload} = await getProductsService({limit});
    const productos = payload;
    socket.emit('productos', payload);

    socket.on('agregarProducto', async (producto) =>{
        const newProduct = await addProductService({...producto});
        if(newProduct){
            productos.push(newProduct);
            socket.emit('productos', productos);
        }
    });

    //Chat
    const messages = await messageModel.find();
    socket.emit('message',messages);

    socket.on('message', async (data) =>{
        const newMessage = await messageModel.create({...data});
        if (newMessage){
            const messages = await messageModel.find();
            socketServer.emit('messageLogs', messages)
        }
    });

    socket.broadcast.emit('newUser');
});

