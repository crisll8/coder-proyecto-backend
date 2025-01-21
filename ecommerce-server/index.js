const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());

app.post('/products', (req, res) => {
    const { title, price, description } = req.body;
    const newProduct = { id: Date.now(), title, price, description };
    io.emit('newProduct', newProduct);
    res.status(201).json(newProduct);
});

server.listen(8080, () => {
    console.log('Servidor corriendo en el puerto 8080');
});
