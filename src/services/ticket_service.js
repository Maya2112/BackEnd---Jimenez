import {ticketModel} from '../models/ticket.js';
import { getCartByIdService } from './cart_service.js';
import { getProductByIdService } from './product_service.js';


export const createTicketService = async (amount, purchaser) => {

    let code = Math.floor(Math.random() * 9000000) + 1000000;
    let purchase_datetime = new Date();

    try{
        return await ticketModel.create({code, purchase_datetime, amount, purchaser});
    }catch (error){
        console.log(`createTicketService error: ${error}`);
        throw error;
    }
}

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

export const generateTicketService = async (cid, purchaser)=> {
    let ticket;
    let { WithStock, WithoutStock, total } = await validateTicketService(cid);
    if (WithStock.length >= 1) {
        ticket = await createTicketService(total, purchaser, WithStock);
    }
    console.log(WithStock);
    let newCart = await getCartByIdService(cid);
    newCart.products = WithoutStock;
    await newCart.save();
    return ticket;
}


