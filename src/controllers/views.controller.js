import {request, response} from 'express';
import { getProductsService } from '../services/product_service.js';
import {getCartByIdService} from '../services/cart_service.js'
import { getUserEmail, regiterUser } from '../services/user_service.js';

export const homeView = async (req = request, res=response)=>{

    const limit= 50;
    const {payload} = await getProductsService({limit});
    const user = req.session.user;
    res.setHeader('Content-Type','text/html');
    res.status(200).render('home', {productos:payload, title: 'Home', user});
};

export const realTimeView = async (req = request, res=response)=>{
    const user = req.session.user;
    res.setHeader('Content-Type','text/html');
    res.status(200).render('realTimeProducts', {title: 'Real time products', user});
};

export const chatView = async (req = request, res = response)=>{
    const user = req.session.user;
    res.setHeader('Content-Type','text/html');
    res.status(200).render('chat', {title: 'Chat', user});
};    

export const productsView = async (req = request, res = response)=>{
    const user = req.session.user;
    const result = await getProductsService({...req.query});
    res.render('products', {title: 'productos', result, user});
};

export const cartView = async (req = request, res = response)=>{
    const {cid}=req.params;
    const user = req.session.user;
    const cart = await getCartByIdService(cid);
    res.render('cart', {title: 'cart', cart, user});
};

export const loginView = async (req= request, res = response)=>{
    res.render('login', {title: 'Login'});
};

export const loginPost = async (req= request, res = response)=>{

    const {password, email} = req.body;
    const user = await getUserEmail(email);

    if(user && user.password === password){
        const username = `${user.name} ${user.lastName}`;
        req.session.user = username;
        req.session.rol = user.rol;
        return res.redirect('/');
    }
    res.redirect('/login');
};

export const logOut = async (req= request, res = response)=>{

    req.session.destroy(err =>{
        if(err){
            res.send({status: false, body:err});
        }else{
            res.redirect('/login');
        }});
};

export const registerView = async (req= request, res = response)=>{
    res.render('register', {title: 'Registrate'});
};

export const registerPost = async (req= request, res = response)=>{

    const {password, confirmPassword} = req.body;

    if(password !== confirmPassword)
        return res.redirect('/register');

    const user = await regiterUser({...req.body});

    if(user){
        const username = `${user.name} ${user.lastName}`;
        req.session.user = username;
        req.session.rol = user.rol;
        return res.redirect('/');
    }

    res.redirect('/register');
};

