import {Schema, model} from 'mongoose';

const collectionName = 'Cart';

const CartSchema = new Schema({

    products:[
        {
            id:{
                type:Schema.Types.ObjectId,
                ref: 'Producto'
            },
            quantity:{
                type:Number,
                required:[true, 'La cantidad del produco es obligatoria']
            }
        }
        
    ]
});

export const cartModel = model(collectionName, CartSchema);