const express = require('express');
const router = express.Router();

let carts = [];
const generateId = () => carts.length ? Math.max(...carts.map(c => c.id)) + 1 : 1;

router.post('/', (req, res) => {
    const newCart = { id: generateId(), products: [] };
    carts.push(newCart);
    res.status(201).json(newCart);
});

router.get('/:cid', (req, res) => {
    const { cid } = req.params;
    const cart = carts.find(c => c.id == cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado.' });
    res.json(cart.products);
});

router.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    const cart = carts.find(c => c.id == cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado.' });
    const productInCart = cart.products.find(p => p.product == pid);
    if (productInCart) productInCart.quantity += 1;
    else cart.products.push({ product: pid, quantity: 1 });
    res.status(201).json(cart);
});

module.exports = router;
