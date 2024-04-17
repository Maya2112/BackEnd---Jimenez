const socket = io();

socket.on('productos', productos=>{

    const Plist = document.getElementById('ProductList');
    
    productos.forEach(producto=>{

        let itemLista = document.createElement("li"); // Crea un elemento <li>
        itemLista.innerHTML= `-id: ${producto.id} <br> -Title: ${producto.title}<br> -Description: ${producto.description}<br> -Price: ${producto.price}<br> -Code: ${producto.code}<br> -Stock: ${producto.stock}<br> -Category:
        ${producto.category}<br> -Status: ${producto.status}<br><br>`;
        Plist.appendChild(itemLista);
        
    })
});

const AddForm = document.getElementById('AddForm');

AddForm.addEventListener('submit', function (event){
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const code = document.getElementById('code').value;
    const stock = document.getElementById('stock').value;
    const category = document.getElementById('category').value;

    const producto ={
        title: title,
        description:description,
        price:price,
        code:code,
        stock:stock,
        category:category
    };

    socket.emit('agregarProducto', producto);
    AddForm.requestFullscreen();
})