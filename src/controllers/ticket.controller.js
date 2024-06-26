import { getCartByIdService } from "../services/cart_service.js";
import { getProductByIdService } from "../services/product_service.js";
import { createTicketService } from "../services/ticket_service.js";

export const purchaseTotal = async (cart) =>{
    return await cart.reduce((accumulator, products) => {
        let productPrice = Number(products.product.price);
        let productQuantity = Number(products.quantity);
        return accumulator + productPrice * productQuantity;
    }, 0);
}

export const validateStock = async (cid)=> {

    let userCart = await getCartByIdService(cid);
    let WithStock = [];
    let WithoutStock = [];
    for (let cartProducts of userCart.products) {
        if (cartProducts.product.stock >= cartProducts.quantity) {
        let product = getProductByIdService(cartProducts.product._id);
        product.stock = product.stock - cartProducts.quantity;
        await product.save();
        WithStock.push(cartProducts);
        await userCart.save();
    } else {
        WithoutStock.push(cartProducts);
        }
    }
    let total = await purchaseTotal(productsWithStock);
    return { productsWithStock, productsWithoutStock, total };
}

export const createTicket = async (amount, purchaser)=>{

    const newTicket= await createTicketService(amount, purchaser);
    return newTicket;
}