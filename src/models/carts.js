import {Schema, model} from 'mongoose';

const collectionName = 'Cart';

const CartSchema = new Schema({

    products:[
        {
            _id:false,
            id:{
                type:Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity:{
                type:Number,
                required:[true, 'La cantidad del produco es obligatoria']
            }
        }
        
    ]
});

CartSchema.pre('find', function(){
    this.populate('products.product');
});

export const cartModel = model(collectionName, CartSchema);