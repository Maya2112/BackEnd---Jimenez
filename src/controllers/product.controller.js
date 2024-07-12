import {request, response} from 'express';
import { deleteProductService, getProductByIdService, getProductsService, updateProductService, addProductService} from '../services/product_service.js';

export const getProducts = async (req = request, res = response)=>{
    try{
        const result = await getProductsService({...req.query});
        res.json({result});
    }catch (error){
        return CustomError.createError(
            "ERROR",
            null,
            "Internal server error",
            errorDictionary.INTERNAL_SERVER_ERROR);
        /*console.log('getproduct', error)
        res.status(500).json({msg:'Contactar al administrador'});*/
    }
}

export const getProductById = async (req = request, res = response)=>{
    try {
        const {pid} = req.params;
        if (!isValidObjectId(pid)) {
            return CustomError.createError(
                "ERROR",
                null,
                "Enter a valid Mongo ID",
                errorDictionary.INVALID_ARGUMENTS);
            //return res.status(400).json({error: 'ID de producto no válido'});
        }

        const product = await getProductByIdService(pid);
        
        if (!product) {
            return CustomError.createError(
                "ERROR",
                null,
                "Cart not found",
                errorDictionary.NOT_FOUND);
            //res.status(404).json({error: 'Producto no encontrado'});
        } else {
            res.json({product});
        }
    } catch (error) {
        return CustomError.createError(
            "ERROR",
            null,
            "Internal server error",
            errorDictionary.INTERNAL_SERVER_ERROR);
        //res.status(500).json({error: 'Hubo un error al procesar la solicitud'});
    }
}

export const addProduct = async (req = request, res = response)=>{
    try {
        const {title, description, price, thumbnail, code, stock, category, status} = req.body;
        if (!title, !description, !price, !code, !category, !stock) {
            return CustomError.createError(
                "ERROR",
                null,
                "Todo los campos son requeridos",
                errorDictionary.INVALID_ARGUMENTS);
            //res.status(404).json({error: 'Todos los campos son obligatorios'});
        } else {
            const product = await addProductService({...req.body})
            res.json({product});
        }
        } catch (error) {
            return CustomError.createError(
                "ERROR",
                null,
                "Internal server error",
                errorDictionary.INTERNAL_SERVER_ERROR);
            //res.status(500).json({error: 'Hubo un error al procesar la solicitud'});
        }
}

export const updateProduct = async (req = request, res = response)=>{
    try {
        const {pid} = req.params;
        const {_id, ...rest}= req.body;

        if (!isValidObjectId(pid)) {
            return CustomError.createError(
                "ERROR",
                null,
                "Enter a valid Mongo ID",
                errorDictionary.INVALID_ARGUMENTS);
            //return res.status(400).json({error: 'ID de producto no válido'});
        }

        const product = await updateProductService(pid, rest);
        
        if (!product) {
            return CustomError.createError(
                "ERROR",
                null,
                "Cart not found",
                errorDictionary.NOT_FOUND);
            //res.status(404).json({error: 'Producto no encontrado'});
        } else {
            res.json({msg: 'Producto actualizado'});
            res.json({product});
        }
        } catch (error) {
            return CustomError.createError(
                "ERROR",
                null,
                "Internal server error",
                errorDictionary.INTERNAL_SERVER_ERROR);
            //res.status(500).json({error: 'Hubo un error al procesar la solicitud'});
        }
}

export const deleteProduct = async (req = request, res = response)=>{
    try {
        const {pid} = req.params;

        if (!isValidObjectId(pid)) {
            return CustomError.createError(
                "ERROR",
                null,
                "Enter a valid Mongo ID",
                errorDictionary.INVALID_ARGUMENTS);
            //return res.status(400).json({error: 'ID de producto no válido'});
        }

        const product = await deleteProductService(pid);
        
        if (!product) {
            return CustomError.createError(
                "ERROR",
                null,
                "Cart not found",
                errorDictionary.NOT_FOUND);
            //res.status(404).json({error: 'Producto no encontrado'});
        } else {
            res.json({msg: 'Producto eliminado'});
            res.json({product});
        }
        } catch (error) {
            return CustomError.createError(
                "ERROR",
                null,
                "Internal server error",
                errorDictionary.INTERNAL_SERVER_ERROR);
            //res.status(500).json({error: 'Hubo un error al procesar la solicitud'});
        }
}

