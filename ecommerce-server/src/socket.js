const io = require('socket.io')(server);
const fs = require('fs');
const path = require('path');

// Emitir productos en tiempo real
function emitProducts() {
  const productsPath = path.join(__dirname, '../data/products.json');
  fs.readFile(productsPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer los productos:', err);
      return;
    }

    const products = JSON.parse(data);
    io.emit('updateProducts', products); // Emitir los productos a todos los clientes conectados
  });
}

// Configurar WebSocket
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');
  
  // Emitir productos al conectar el cliente
  emitProducts();

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});
