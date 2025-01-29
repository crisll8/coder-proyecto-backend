const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const productsFilePath = path.join(__dirname, '../../data/products.json');

const getProducts = () => JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));

router.get('/', (req, res) => {
    res.render('home', { products: getProducts() });
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { products: getProducts() });
});

module.exports = router;
