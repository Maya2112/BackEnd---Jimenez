import {request, response} from 'express';
import { deleteProductService, getProductByIdService, getProductsService, updateProductService, addProductService} from '../services/product_service.js';

export const getProducts = async (req = request, res = response)=>{
    try{
        const result = await getProductsService({...req.query});
        res.json({result});
    }catch (error){
        console.log('getproduct', error)
        res.status(500).json({msg:'Contactar al administrador'});
    }
}

export const getProductById = async (req = request, res = response)=>{
    try {
        const {pid} = req.params;
        const product = await getProductByIdService(pid);
        if (!product) {
            res.status(404).json({error: 'Producto no encontrado'});
        } else {
            res.json({product});
        }
        } catch (error) {
            console.log(`getProductById error: ${error}`);
            res.status(500).json({error: 'Hubo un error al procesar la solicitud'});
        }
}

export const addProduct = async (req = request, res = response)=>{
    try {
        const {title, description, price, thumbnail, code, stock, category, status} = req.body;
        if (!title, !description, !price, !code, !category, !stock) {
            res.status(404).json({error: 'Todos los campos son obligatorios'});
        } else {
            const product = await addProductService({...req.body})
            res.json({product});
        }
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al procesar la solicitud'});
        }
}

export const updateProduct = async (req = request, res = response)=>{
    try {
        const {pid} = req.params;
        const {_id, ...rest}= req.body;
        const product = await updateProductService(pid, rest);
        if (!product) {
            res.status(404).json({error: 'Producto no encontrado'});
        } else {
            res.json({msg: 'Producto actualizado'});
            res.json({product});
        }
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al procesar la solicitud'});
        }
}

export const deleteProduct = async (req = request, res = response)=>{
    try {
        const {pid} = req.params;
        const product = await deleteProductService(pid);
        if (!product) {
            res.status(404).json({error: 'Producto no encontrado'});
        } else {
            res.json({msg: 'Producto eliminado'});
            res.json({product});
        }
        } catch (error) {
            res.status(500).json({error: 'Hubo un error al procesar la solicitud'});
        }
}

