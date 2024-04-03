import fs from 'fs';

class CartManager{

    carts;
    path;

    static productId = 0;

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
            console.log(`Ocurrio un error al momento de cargar el archivo de productos, error: ${error}`);
        }
    }

    #saveFile(){
        try{
            fs.writeFileSync(this.path, JSON.stringify(this.carts));
        }catch (error){
            return `Ocurrio un error al momento de guardar en el archivo de productos, error: ${error}`;
        }
    }

    #CartIdAssigne(){
        let id = 1;
        if (this.carts.length != 0){
            id = this.carts[this.carts.length - 1].id + 1;
        }
        return id;
    }

    CreateCart(){
        const newCart = {
            id: this.#CartIdAssigne(),
            products:[]
        }
        this.carts.push(newCart);
        this.#saveFile();

        return newCart;
    }

    getCartById(id){
        id = Number(id);
        const cartById= this.carts.find(item => item.id === id)
        if(cartById){
            return cartById;
        }else{
            return `Product by id ${id} not found`;
        }

    }

}

export default CartManager;