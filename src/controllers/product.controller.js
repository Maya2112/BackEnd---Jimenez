import {request, response} from 'express';
import {productModel} from '../models/products.js'

export const getProducts = async (req = request, res = response)=>{
    try{
        const {limit}= req.query;
        const product = await productModel.find().limit(Number(limit));
        res.json({product});
    }catch{
        console.log(`getProducts error: ${error}`);
        res.status(500).json({msg:'Contactar al administrador'});
    }
}

export const getProductById = async (req = request, res = response)=>{
    try {
        const {pid} = req.params;
        const product = await productModel.findById(pid);
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
            const product = await productModel.create({title, description, price, thumbnail, code, stock, category, status});
            res.json({product});
        }
        } catch (error) {
            console.log(`addProduct error: ${error}`);
            res.status(500).json({error: 'Hubo un error al procesar la solicitud'});
        }
}

export const updateProduct = async (req = request, res = response)=>{
    try {
        const {pid} = req.params;
        const {_id, ...rest}= req.body;
        const product = await productModel.findByIdAndUpdate(pid, {...rest}, {new: true});
        if (!product) {
            res.status(404).json({error: 'Producto no encontrado'});
        } else {
            res.json({msg: 'Producto actualizado'});
            res.json({product});
        }
        } catch (error) {
            console.log(`updateProduct error: ${error}`);
            res.status(500).json({error: 'Hubo un error al procesar la solicitud'});
        }
}

export const deleteProduct = async (req = request, res = response)=>{
    try {
        const {pid} = req.params;
        const product = await productModel.findByIdAndDelete(pid);
        if (!product) {
            res.status(404).json({error: 'Producto no encontrado'});
        } else {
            res.json({msg: 'Producto eliminado'});
            res.json({product});
        }
        } catch (error) {
            console.log(`deleteProduct error: ${error}`);
            res.status(500).json({error: 'Hubo un error al procesar la solicitud'});
        }
}

