const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const productsFilePath = path.join(__dirname, '../../data/products.json');

const getProducts = () => {
    const data = fs.readFileSync(productsFilePath, 'utf-8');
    return JSON.parse(data);
};

router.get('/', (req, res) => {
    const products = getProducts();
    res.json(products);
});

router.get('/:id', (req, res) => {
    const products = getProducts();
    const product = products.find(p => p.id === parseInt(req.params.id));

    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(product);
});

module.exports = router;
