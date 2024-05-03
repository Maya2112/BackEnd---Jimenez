import {request, response} from 'express';
import {cartModel} from '../models/carts.js';

export const getCartById = async (req = request, res = response)=>{
    try{
        const {cid} = req.params;
        const cart = await cartModel.findById(cid);

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
        const cart = await cartModel.create({});
        res.json({msg: 'Carrito creado', cart});
    }catch{
        res.status(500).json({error: 'Hubo un error al procesar la solicitud'});
    }
}

export const addProductToCart = async (req = request, res = response)=>{
    try{
        const {cid, pid}=req.params;
        const cart = await cartModel.findById(cid);

        if (!cart){
            res.status(404).json({error: 'El carrito no existe'});
        }else{
            const productExist= cart.products.find(p=>p.id.toString() === pid);
            if(productExist){
                productExist.quantity++;
            }else{
                cart.products.push({id: pid, quantity:1});
            }
        }
        cart.save();
        res.json({msg: 'Carrito actualizado', cart});
    }catch{
        res.status(500).json({error: 'Hubo un error al procesar la solicitud'});
    }
}