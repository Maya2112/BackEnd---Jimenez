import {Schema, model} from 'mongoose';

const collectionName = 'Product';

const ProductSchema = new Schema({
    
    title:{type:String, required:[true, 'El titulo del producto es obligatorio']}, 
    description:{type:String, required:[true, 'La descripcion del producto es obligatoria']}, 
    price:{type:Number, required:[true, 'El precio del producto es obligatorio']},
    thumbnail:{type:String},
    code:{type:String, required:[true, 'El codigo del producto es obligatorio'], unique: true},
    stock:{type:String, required:[true, 'El stok del producto es obligatorio']},
    category:{type:String, required:[true, 'La categoria del producto es obligatoria']},
    status:{type:Boolean, default: true},
});

export const productModel = model(collectionName, ProductSchema);