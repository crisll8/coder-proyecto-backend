const socket = io();

document.getElementById('product-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    
    socket.emit('addProduct', { title, price });
    document.getElementById('title').value = '';
    document.getElementById('price').value = '';
});

socket.on('updateProducts', (products) => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `${product.title} - Precio: ${product.price} <button onclick="deleteProduct(${product.id})">Eliminar</button>`;
        productList.appendChild(li);
    });
});

function deleteProduct(id) {
    socket.emit('deleteProduct', id);
}
