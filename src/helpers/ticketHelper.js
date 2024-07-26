import { updateProduct } from '../controllers/product.controller.js';
import { updateCartProductService, getCartByIdService } from '../services/cart_service.js';
import { getProductByIdService } from '../services/product_service.js';

export const ticketTotalService = async (cart) =>{
    const total = await cart.reduce((accumulator, products) => {
        let productPrice = Number(products.product.price);
        let productQuantity = Number(products.quantity);
        return accumulator + productPrice * productQuantity;
    }, 0);
    
    return total;
    
}

export const validateTicketService = async (cid)=> {

    let conStock=[];
    let sinStock=[];
    let total;
    let pid;
    let quantity;

    const cart = await getCartByIdService(cid);
    
    for(let i=0; i<cart.products.length; i++){
        pid=cart.products[i].id;
        quantity=cart.products[i].quantity;
        let product=await getProductByIdService(pid);
        if(!product || product.stock<quantity){
            sinStock.push(cart.products[i])
            if(product.stock<quantity){
                console.log(`El producto ${product.description} no tiene stock suficiente: stock ${product.stock} | cantidad: ${quantity}`)
            }
        }else{
            conStock.push({
                pid, 
                description: product.description, 
                price: product.price,
                stockPrevCompra: product.stock,
                stockPostCompra: product.stock - quantity,
                quantity, 
                subtotal: quantity*product.price
            })
            total = await ticketTotalService(conStock)
            // restar stock de productos...
            product.stock=product.stock-quantity
            await updateProduct(pid, ...product);
        }
    }
    
    if(conStock.length===0){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`No existe ítems en condiciones de ser comprados en el carrito con id ${cid}. Verifique stock / códigos de producto.`})
    }
    
    cart.products=sinStock;
    await updateCartProductService(cid, pid, quantity);

    return { conStock, sinStock, total };
}