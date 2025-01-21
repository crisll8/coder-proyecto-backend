const express = require('express');
const fs = require('fs').promises;
const router = express.Router();

const filePath = './data/products.json';

// Leer productos desde el archivo
const readProducts = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
};

// Escribir productos en el archivo
const writeProducts = async (products) => {
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));
};

// Crear producto
router.post('/', async (req, res) => {
    const { title, status = true, stock, category, thumbnails = [], description, code, price } = req.body;
    if (!title || !stock || !category || !description || !code || !price) return res.status(400).json({ error: 'Faltan campos obligatorios.' });

    const products = await readProducts();
    const newProduct = { id: products.length + 1, title, status, stock, category, thumbnails, description, code, price };
    products.push(newProduct);
    await writeProducts(products);
    res.status(201).json(newProduct);
});

// Actualizar producto
router.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    const products = await readProducts();
    const index = products.findIndex(p => p.id == pid);
    if (index === -1) return res.status(404).json({ error: 'Producto no encontrado.' });

    const updatedFields = req.body;
    delete updatedFields.id;
    products[index] = { ...products[index], ...updatedFields };
    await writeProducts(products);
    res.json(products[index]);
});

// Eliminar producto
router.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    const products = await readProducts();
    const index = products.findIndex(p => p.id == pid);
    if (index === -1) return res.status(404).json({ error: 'Producto no encontrado.' });

    products.splice(index, 1);
    await writeProducts(products);
    res.status(204).send();
});

module.exports = router;
