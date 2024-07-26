import {request, response} from 'express';
import { addProductToCartService, createCartService, deleteCartProductService, getCartByIdService, updateCartProductService, deleteAllProductCartService } from '../services/cart_service.js';
import { isValidObjectId } from 'mongoose';
import {validateTicketService} from '../helpers/ticketHelper.js'
import {createTicketService} from '../services/ticket_service.js'
import {CustomError} from '../utils/errorCustomizer.js'
import { errorDictionary } from '../utils/errorDictionary.js';
import { enviarMail } from '../utils.js';


export const getCartById = async (req = request, res = response, next)=>{
    try{
        const {test}= req.session?.user;
        const {cid} = req.session?.user.cart;

        if (!test || !cid)
            console.log('no hay user, session o cart');

        if (!isValidObjectId(cid)) {
            CustomError.createError(
                "ERROR",
                null,
                "Enter a valid Mongo ID",
                errorDictionary.INVALID_ARGUMENTS);
            //return res.status(400).json({error: 'ID no válido'});
        }

        const cart = await getCartByIdService(cid);

        if (!cart) {
            return CustomError.createError(
                "ERROR",
                null,
                "Cart not found",
                errorDictionary.NOT_FOUND);
            //res.status(404).json({error: 'Carrito no encontrado'});
        } else {
            res.json({cart});
        }
    } catch (error) {
        next(error);
    }
}

/*export const createCart = async (req = request, res = response)=>{
    try{
        const cart = await createCartService();
        res.json({msg: 'Carrito creado', cart});
    }catch (error){
        console.log(`createCart error: ${error}`);
        res.status(500).json({error: 'Hubo un error al procesar la solicitud'});
    }
}*/

export const addProductToCart = async (req = request, res = response, next)=>{
    try{
        const {cid, pid}=req.params;

        if (!isValidObjectId(cid) && !isValidObjectId(pid)) {
            return CustomError.createError(
                "ERROR",
                null,
                "Enter a valid Mongo ID",
                errorDictionary.INVALID_ARGUMENTS);
            //return res.status(400).json({error: 'ID de producto  carrito no válido'});
        }
        const cart = await addProductToCartService(cid, pid);

        if (!cart)
            return CustomError.createError(
                "ERROR",
                null,
                "Cart not found",
                errorDictionary.NOT_FOUND);
            //res.status(404).json({error: 'El carrito no existe'});
        res.json({msg: 'Carrito actualizado', cart});
    }catch(error){
        next(error);
        /*return CustomError.createError(
            "ERROR",
            null,
            "Internal server error",
            errorDictionary.INTERNAL_SERVER_ERROR);*/
        //res.status(500).json({error: 'Hubo un error al procesar la solicitud'});
    }
}

export const deleteCartProduct = async (req = request, res = response, next) =>{
    try{
        const {cid, pid}= req.params;

        if (!isValidObjectId(cid) && !isValidObjectId(pid)) {
            return CustomError.createError(
                "ERROR",
                null,
                "Enter a valid Mongo ID",
                errorDictionary.INVALID_ARGUMENTS);
            //return res.status(400).json({error: 'ID de producto  carrito no válido'});
        }

        const cart = await deleteCartProductService(cid, pid);
        
        if(!cart)
            return CustomError.createError(
                "ERROR",
                null,
                "Cart not found",
                errorDictionary.NOT_FOUND);
            //res.status(404).json({msg: 'Es posible que el carrito o producto seleccionad no exista'});
        
        res.json ({msg:'Se elimino el producto del carrito', cart})
    
    }catch (error){
        next(error);
        /*return CustomError.createError(
            "ERROR",
            null,
            "Internal server error",
            errorDictionary.INTERNAL_SERVER_ERROR);*/
        //res.status(500).json({error: 'Hubo un error al procesar la solicitud'});
    }
}

export const updateCartProduct = async (req = request, res = response, next) =>{
    try{
        const {cid, pid}= req.params;
        const {quantity} = req.body;

        if (!isValidObjectId(cid) && !isValidObjectId(pid)) {
            return CustomError.createError(
                "ERROR",
                null,
                "Enter a valid Mongo ID",
                errorDictionary.INVALID_ARGUMENTS);
            //return res.status(400).json({error: 'ID de producto  carrito no válido'});
        }

        if(!quantity || !Number.isInteger(quantity))
            return CustomError.createError(
                "ERROR",
                null,
                "Quantity have to be a numeric value",
                errorDictionary.INVALID_ARGUMENTS);
            //res.status(404).json({msg:'La cantidad debe ser un valor numerico'});

        const cart = await updateCartProductService(cid, pid, quantity);
        
        if(!cart)
            return CustomError.createError(
                "ERROR",
                null,
                "Cart not found",
                errorDictionary.NOT_FOUND);
            //res.status(404).json({msg: 'Es posible que el carrito o producto seleccionado no exista'});
        
        res.json ({msg:'Producto actualizado en el carrito', cart})
    
    }catch (error){
        next(error);
    }
}

export const deleteAllProductCart = async (req = request, res = response, next) =>{
    try{
        const {cid}= req.params;

        if (!isValidObjectId(cid)) {
            return CustomError.createError(
                "ERROR",
                null,
                "Enter a valid Mongo ID",
                errorDictionary.INVALID_ARGUMENTS);
            //return res.status(400).json({error: 'ID de producto  carrito no válido'});
        }
        
        const cart = await deleteAllProductCartService(cid);
        
        if(!cart)
            return CustomError.createError(
                "ERROR",
                null,
                "Cart not found",
                errorDictionary.NOT_FOUND);
            //res.status(404).json({msg: 'Es posible que el carrito no exista'});
        
        res.json ({msg:'Producto actualizado en el carrito', cart})
    
    }catch (error){
        next(error);
        /*return CustomError.createError(
            "ERROR",
            null,
            "Internal server error",
            errorDictionary.INTERNAL_SERVER_ERROR);*/
        //res.status(500).json({error: 'Hubo un error al procesar la solicitud'});
    }
}


export const generatePurchase = async (req = request, res= response, next)=> {

    try {
        const {cid}=req.params;

        if(!isValidObjectId(cid)){
            CustomError.createError("Error cartController", `Carrito invalido`, `El id de carrito ${cid} no es valido`, errorDictionary['INVALID_ARGUMENTS']);
        }
    
        const cart=await getCartByIdService(cid);
        if(!cart){
            CustomError.createError("Error cartController", `Carrito inexistente`, `El carrito con id ${cid} no existe en BD`, errorDictionary['INVALID_ARGUMENTS']);
        }
    
        if(cart.products.length===0){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`El carrito con id ${cid} no tiene ítems...`})
        }
    
        const pucharser=req.session.user?.email
        let ticket;
        let { conStock, sinStock, total } = await validateTicketService(cid);

        if (conStock.length >= 1) {
        ticket = await createTicketService(total, pucharser, conStock);
    }
    
        let message=`Hola ${req.session.user?.name}...!!!<br>
        Has registrado una compra con n° ticket ${nroComp}, por un importe de $ ${total}.<br>
        Detalle: ${JSON.stringify(conStock)}<br>
        ${sinStock.length>0?`Algunos ítems no pudieron comprarse... por favor consulte`:""}
        <br>
        Por favor contacte a <a href="mailto:pagos@julio.com">pagos</a> para finalizar la operación.<br>
        Gracias...!!!`
    
        let result=await enviarMail(pucharser, `Tu compra está a un paso de concretarse...`, message)
        
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({ticket});
        
    } catch (error) {
        next(error)
    }
}