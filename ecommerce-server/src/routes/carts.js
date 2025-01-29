const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const cartsFilePath = path.join(__dirname, '../../data/carts.json');

const getCarts = () => JSON.parse(fs.readFileSync(cartsFilePath, 'utf8'));

router.post('/', (req, res) => {
    let carts = getCarts();
    const newCart = { id: carts.length ? Math.max(...carts.map(c => c.id)) + 1 : 1, products: [] };
    carts.push(newCart);
    fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
    res.status(201).json(newCart);
});

router.get('/:cid', (req, res) => {
    const carts = getCarts();
    const cart = carts.find(c => c.id == req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart);
});

router.post('/:cid/product/:pid', (req, res) => {
    let carts = getCarts();
    const { cid, pid } = req.params;
    const cart = carts.find(c => c.id == cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    const product = cart.products.find(p => p.product == pid);
    if (product) product.quantity += 1;
    else cart.products.push({ product: pid, quantity: 1 });

    fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
    res.status(201).json(cart);
});

module.exports = router;
