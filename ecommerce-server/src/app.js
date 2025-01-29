const express = require('express');
const path = require('path');
const hbs = require('express-handlebars').create();  
const dotenv = require('dotenv');
const socketIo = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

dotenv.config();

app.engine('handlebars', hbs.engine); 
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

const viewsRouter = require(path.join(__dirname, 'src', 'routes', 'views'));
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

app.use('/', viewsRouter);
app.use('/products', productsRouter);
app.use('/carts', cartsRouter);

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});
