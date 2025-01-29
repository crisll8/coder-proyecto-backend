const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('Nuevo cliente conectado');

        socket.on('addProduct', (product) => {
            let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
            product.id = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
            products.push(product);
            fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
            io.emit('updateProducts', products);
        });

        socket.on('deleteProduct', (id) => {
            let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
            products = products.filter(p => p.id !== id);
            fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
            io.emit('updateProducts', products);
        });
    });
};
