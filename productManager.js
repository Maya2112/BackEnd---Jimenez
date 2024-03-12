class ProductManager{

    products;

    static productId = 0;

    constructor (){

        this.products = [];

    }

    addProduct(title, description, price, thumbnail, code, stock){

        if (title && description && price && thumbnail && code && stock){
            const codeRep = this.products.some(item => item.code === code)
            if(codeRep){
                return `Este codigo ${code} ya esta asignado a otro producto, ingrese uno diferente`
            }else {
                ProductManager.productId = ProductManager.productId +1;
                const id = ProductManager.productId;
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
            }
        }else{
            return `Todos los campos son obligatorios, intente de nuevo`
        }
    }

    getProduct(){
        return this.products;
    }

    getProductById(id){

        const productById= this.products.find(item => item.id === id)
        if(productById){
            return productById;
        }else{
            return `Product by id ${id} not found`;
        }

    }
}

const producto = new ProductManager();

console.log(producto.getProduct());
console.log(producto.addProduct('Producto prueba', 'Esto es un producto prueba', 200, 'SinImagen', 'ABC123', 25));
console.log(producto.addProduct('Producto prueba2', 'Esto es un producto prueba', 300, 'SinImagen', 'ABC345'));
console.log(producto.getProduct());
console.log(producto.addProduct('Producto prueba3', 'Esto es un producto prueba', 250, 'SinImagen', 'ABC123', 30));
console.log(producto.getProductById(3));
console.log(producto.getProductById(1));