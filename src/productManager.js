import fs from 'fs';

class ProductManager{

    products;
    path;

    static productId = 0;

    constructor (){

        this.path = './src/data/products.json';
        this.products = this.#getProductsInFile();
        

    }

    #getProductsInFile(){
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
            fs.writeFileSync(this.path, JSON.stringify(this.products));
        }catch (error){
            console.log(`Ocurrio un error al momento de guardar en el archivo de productos, error: ${error}`);
        }
    }

    #ProductIdAssigne(){
        let id = 1;
        if (this.products.length != 0){
            id = this.products[this.products.length - 1].id + 1;
        }
        return id;
    }

    addProduct(title, description, price, thumbnail, code, stock){

        if (title && description && price && thumbnail && code && stock){
            const codeRep = this.products.some(item => item.code === code)
            if(codeRep){
                return `Este codigo ${code} ya esta asignado a otro producto, ingrese uno diferente`
            }else {
                ProductManager.productId = ProductManager.productId +1;
                const id = this.#ProductIdAssigne();
                const NewProduct = {
                    id:id,
                    title: title,
                    description:description,
                    price:price,
                    thumbnail:thumbnail,
                    code:code,
                    stock:stock
                }
                this.products.push(NewProduct);
                this.#saveFile();
                console.log('Producto agregado');
            }
        }else{
            return `Todos los campos son obligatorios, intente de nuevo`
        }
    }

    getProduct(limit = 0){
        limit = Number(limit);
        if (limit > 0){
            return this.products.slice(0, limit);
        }
        return this.products;
    }

    getProductById(id){
        id = Number(id);
        const productById= this.products.find(item => item.id === id)
        if(productById){
            return productById;
        }else{
            return `Product by id ${id} not found`;
        }

    }

    updateProduct(id, propsUpdate){
        const index = this.products.findIndex(item => item.id === id);

        if(index >= 0){
            const {id, ...rest} = propsUpdate;
            this.products[index] = {...this.products[index], ...rest}
            this.#saveFile();
            console.log('Producto actualizado');
        }else {
            console.log(`El producto con el id ${id} no existe`);
        }


    }

    deleteProduct(id){

        const index = this.products.findIndex(item => item.id === id);

        if (index >= 0){
            this.products = this.products.filter(item => item.id !== id);
            this.#saveFile();
            console.log ('Producto eliminado')
        }else{
            console.log(`El producto con el id ${id} no existe`)
        }

    }
}

export default ProductManager;