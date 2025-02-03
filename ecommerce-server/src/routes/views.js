const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const productsFilePath = path.join(__dirname, '../../data/products.json');

const getProducts = () => {
    try {
        const data = fs.readFileSync(productsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al leer products.json:', error.message);
        return []; // Devuelve un array vacío si hay error
    }
};


router.get('/', (req, res) => {
    res.render('home', { products: getProducts() });
});

router.get('/realtimeproducts', (req, res) => {
    const products = getProducts();
    console.log(products); // Verifica que los productos son cargados
    res.render('realTimeProducts', { products: products });
});



module.exports = router;
