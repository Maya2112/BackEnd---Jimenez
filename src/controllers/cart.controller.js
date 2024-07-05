import {request, response} from 'express';
import { addProductToCartService, createCartService, deleteCartProductService, getCartByIdService, updateCartProductService, deleteAllProductCartService } from '../services/cart_service.js';
import { isValidObjectId } from 'mongoose';
import { generateTicketService } from '../services/ticket_service.js';

export const getCartById = async (req = request, res = response)=>{
    try{
        const {cid} = req.params;

        if (!isValidObjectId(cid)) {
            return res.status(400).json({error: 'ID no válido'});
        }

        const cart = await getCartByIdService(cid);

        if (!cart) {
            res.status(404).json({error: 'Carrito no encontrado'});
        } else {
            res.json({cart});
        }
    } catch (error) {
            res.status(500).json({error: 'Hubo un error al procesar la solicitud'});
    }
}

export const createCart = async (req = request, res = response)=>{
    try{
        const cart = await createCartService();
        res.json({msg: 'Carrito creado', cart});
    }catch (error){
        console.log(`createCart error: ${error}`);
        res.status(500).json({error: 'Hubo un error al procesar la solicitud'});
    }
}

export const addProductToCart = async (req = request, res = response)=>{
    try{
        const {cid, pid}=req.params;

        if (!isValidObjectId(cid) && !isValidObjectId(pid)) {
            return res.status(400).json({error: 'ID de producto  carrito no válido'});
        }
        const cart = await addProductToCartService(cid, pid);

        if (!cart)
            res.status(404).json({error: 'El carrito no existe'});
        res.json({msg: 'Carrito actualizado', cart});
    }catch(error){
        res.status(500).json({error: 'Hubo un error al procesar la solicitud'});
    }
}

export const deleteCartProduct = async (req = request, res = response) =>{
    try{
        const {cid, pid}= req.params;

        if (!isValidObjectId(cid) && !isValidObjectId(pid)) {
            return res.status(400).json({error: 'ID de producto  carrito no válido'});
        }

        const cart = await deleteCartProductService(cid, pid);
        
        if(!cart)
            res.status(404).json({msg: 'Es posible que el carrito o producto seleccionad no exista'});
        
        res.json ({msg:'Se elimino el producto del carrito', cart})
    
    }catch (error){
        res.status(500).json({error: 'Hubo un error al procesar la solicitud'});
    }
}

export const updateCartProduct = async (req = request, res = response) =>{
    try{
        const {cid, pid}= req.params;
        const {quantity} = req.body;

        if (!isValidObjectId(cid) && !isValidObjectId(pid)) {
            return res.status(400).json({error: 'ID de producto  carrito no válido'});
        }

        if(!quantity || !Number.isInteger(quantity))
            res.status(404).json({msg:'La cantidad debe ser un valor numerico'});

        const cart = await updateCartProductService(cid, pid, quantity);
        
        if(!cart)
            res.status(404).json({msg: 'Es posible que el carrito o producto seleccionado no exista'});
        
        res.json ({msg:'Producto actualizado en el carrito', cart})
    
    }catch (error){
        res.status(500).json({error: 'Hubo un error al procesar la solicitud'});
    }
}

export const deleteAllProductCart = async (req = request, res = response) =>{
    try{
        const {cid}= req.params;

        if (!isValidObjectId(cid)) {
            return res.status(400).json({error: 'ID de producto  carrito no válido'});
        }
        
        const cart = await deleteAllProductCartService(cid);
        
        if(!cart)
            res.status(404).json({msg: 'Es posible que el carrito no exista'});
        
        res.json ({msg:'Producto actualizado en el carrito', cart})
    
    }catch (error){
        res.status(500).json({error: 'Hubo un error al procesar la solicitud'});
    }
}

export const finishPurchase = async (req = request, res = response) => {
    try{
        
        const pucharser = req.session.user.name;
        console.log(pucharser);
        const {cid} = req.params;
        

        if (!isValidObjectId(cid)) {
            return res.status(400).json({error: 'ID de carrito no válido'});
        }

        const purchase = await generateTicketService(cid, pucharser);

        res.json({msg:'Compra finalizada', purchase});
        }catch(error){
            res.status(500).json({error: 'Hubo un error al procesar la solicitud'});
        }
}