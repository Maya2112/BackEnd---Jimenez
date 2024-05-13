import { cartModel } from "../models/carts.js";

export const getCartByIdService = async (cid)=>{
    try{
        return await cartModel.findById(cid).populate('products.id').lean();
    } catch (error) {
        console.log('getCartByIdService error:', error);
        throw error;
    }
}

export const createCartService = async ()=>{
    try{
        return await cartModel.create({});
    }catch (error){
        console.log(`createCartService error: ${error}`);
        throw error;
    }
}

export const addProductToCartService = async (cid, pid)=>{
    try{
        const cart = await cartModel.findById(cid);

        if (!cart){
            return null;
        }else{
            const productExist= cart.products.find(p=>p.id.toString() === pid);
            if(productExist){
                productExist.quantity++;
            }else{
                cart.products.push({id: pid, quantity:1});
            }
        }
        cart.save();
        return cart;
    }catch(error){
        console.log('addProductToCartService error:', error);
        throw error;
    }
}

export const deleteCartProductService = async (cid, pid)=>{
    try{
        return await cartModel.findByIdAndUpdate(cid, {$pull:{'products':{id:pid}}}, {new: true});
    }catch (error) {
        console.log('deleteCartProdcutService error: ', error);
        throw error;
    }
}

export const updateCartProductService = async (cid, pid, quantity) =>{
    try{
        return await cartModel.findOneAndUpdate({_id:cid, 'products.id':pid}, {$set:{'products.$.quantity':quantity}}, {new: true});
    }catch (error){
        console.log('updateCartProdcutService error: ', error);
        throw error;
    }
}

export const deleteAllProductCartService = async (cid) =>{
    try{
        return await cartModel.findByIdAndUpdate(cid, { $set: {'products': [] } }, {new: true});
    }catch (error){
        console.log('deleteAllProductCartService error: ', error);
        throw error;
    }
}