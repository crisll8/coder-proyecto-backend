const express = require('express');
const router = express.Router();

let products = [];
const generateId = () => products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;

router.post('/', (req, res) => {
    const { title, status = true, stock, category, thumbnails = [], description, code, price } = req.body;
    if (!title || !stock || !category || !description || !code || !price) return res.status(400).json({ error: 'Faltan campos obligatorios.' });
    const newProduct = { id: generateId(), title, status, stock, category, thumbnails, description, code, price };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

router.put('/:pid', (req, res) => {
    const { pid } = req.params;
    const index = products.findIndex(p => p.id == pid);
    if (index === -1) return res.status(404).json({ error: 'Producto no encontrado.' });
    const updatedFields = req.body;
    delete updatedFields.id;
    products[index] = { ...products[index], ...updatedFields };
    res.json(products[index]);
});

router.delete('/:pid', (req, res) => {
    const { pid } = req.params;
    const index = products.findIndex(p => p.id == pid);
    if (index === -1) return res.status(404).json({ error: 'Producto no encontrado.' });
    products.splice(index, 1);
    res.status(204).send();
});

module.exports = router;
