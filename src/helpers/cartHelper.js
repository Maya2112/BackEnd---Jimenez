import { getCartByIdService } from "../services/cart_service.js"


/*export const itemsInCart = async (cid) =>{

    const cart = await getCartByIdService(cid)

    return cart.products.reduce((acc, product) => acc + product.quantity, 0)

}*/

Handlebars.registerHelper("itemsInCart", async function(cart) {

    const cartID= await getCartByIdService (cart);

    return cartID.products.reduce((acc, product) => acc + product.quantity, 0);
});