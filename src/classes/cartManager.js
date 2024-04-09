import fs from 'fs';
import ProductManager from './productManager.js';

class CartManager{

    carts;
    path;

    static cartId=0;

    constructor (){

        this.path = './src/data/carts.json';
        this.carts = this.#getCartsInFile();
        

    }

    #getCartsInFile(){
        try{
            if(fs.existsSync(this.path)){
                return JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            }else{
                return [];
            }

        }catch (error){
            return `Ocurrio un error al momento de cargar el archivo de carritos, error: ${error}`;
        }
    }

    #saveFile(){
        try{
            fs.writeFileSync(this.path, JSON.stringify(this.carts));
        }catch (error){
            return `Ocurrio un error al momento de guardar en el archivo de carritos, error: ${error}`;
        }
    }

    #CartIdAssigne(){
        let id = 1;
        if (this.carts.length != 0){
            id = this.carts[this.carts.length - 1].id + 1;
        }
        return id;
    }

    createCart(){
        CartManager.cartId = CartManager.cartId +1;
        const id = this.#CartIdAssigne();

        const newCart = {
            id: id,
            products:[]
        };

        this.carts.push(newCart);
        this.#saveFile();

        return 'Carrito agregado';
    }

    getCartById(id){
        id = Number(id);
        const cartById= this.carts.find(item => item.id === id);
        let cartExist = false;
        if(cartById){
            cartExist= true;
            return cartById;
        }else{
            return cartExist;
        }

    }

    addProductToCart(cid, pid){
        let toCart = false;
        let msg = `El cart con id ${cid} no existe`;
        const  cartId= this.carts.find(itemC=>itemC.id===cid);
        const indexC = this.carts.indexOf(cartId);
        
        if (cartId){
            const productInCart = this.carts[indexC].products.findIndex(itemP => itemP.id===pid);
            const p= new ProductManager();
            const product = p.getProductById(pid);
            
            if(product.exist && productInCart ===-1){
                this.carts[indexC].products.push({id:pid, 'quantity':1});
                this.#saveFile();
                toCart= true;
                msg = `Producto con id ${pid} agregado al cart ${cid}`;
            }else if(product.exist && productInCart !==-1){
                ++this.carts[indexC].products[productInCart].quantity;
                this.#saveFile();
                toCart= true;
                msg = `Producto con id ${pid} incrementado en el cart ${cid}`;
            }
        }
        return {toCart, msg};
    }

}

export default CartManager;