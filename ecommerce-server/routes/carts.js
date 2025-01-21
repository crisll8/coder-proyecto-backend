const express = require('express');
const fs = require('fs').promises;
const router = express.Router();

const filePath = './data/carts.json';

const readCarts = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
};

const writeCarts = async (carts) => {
    await fs.writeFile(filePath, JSON.stringify(carts, null, 2));
};

// Crear carrito
router.post('/', async (req, res) => {
    const carts = await readCarts();
    const newCart = { id: carts.length + 1, products: [] };
    carts.push(newCart);
    await writeCarts(carts);
    res.status(201).json(newCart);
});

// Obtener productos del carrito
router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    const carts = await readCarts();
    const cart = carts.find(c => c.id == cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado.' });
    res.json(cart.products);
});

// Agregar producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const carts = await readCarts();
    const cart = carts.find(c => c.id == cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado.' });

    const productInCart = cart.products.find(p => p.product == pid);
    if (productInCart) productInCart.quantity += 1;
    else cart.products.push({ product: pid, quantity: 1 });

    await writeCarts(carts);
    res.status(201).json(cart);
});

module.exports = router;
