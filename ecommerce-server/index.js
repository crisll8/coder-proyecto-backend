const express = require('express');
const productRouter = require('./routes/products');
const cartRouter = require('./routes/carts');

const app = express();
app.use(express.json());

app.use('/products', productRouter);
app.use('/carts', cartRouter);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
