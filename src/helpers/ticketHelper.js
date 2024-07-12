import { getCartByIdService } from './cart_service.js';
import { getProductByIdService } from './product_service.js';

export const ticketTotalService = async (cart) =>{
    const total = await cart.reduce((accumulator, products) => {
        let productPrice = Number(products.product.price);
        let productQuantity = Number(products.quantity);
        return accumulator + productPrice * productQuantity;
    }, 0);
    
    return total;
    
}

export const validateTicketService = async (cid)=> {

    const userCart = await getCartByIdService(cid);
    let WithStock = [];
    let WithoutStock = [];
    for (let cartProducts of userCart.products) {
        if (cartProducts.product.stock >= cartProducts.quantity) {
        const product = await getProductByIdService(cartProducts.product._id);
        product.stock = product.stock - cartProducts.quantity;
        await product.save();
        WithStock.push(cartProducts);
        await userCart.save();
    } else {
        WithoutStock.push(cartProducts);
        }
    }
    let total = await ticketTotalService(WithStock);
    return { WithStock, WithoutStock, total };
}