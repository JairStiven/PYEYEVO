const Product = require('../models/Product.js');

// Obtener todos los productos
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        console.error('⛔ ERROR en getAllProducts:', error);
        res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
    }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: '❌ Producto no encontrado' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('⛔ ERROR en getProductById:', error);
        res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
    }
};

// Crear un nuevo producto
const createProduct = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock, imagen, categoria_id } = req.body;
        
        if (!nombre || !precio || !stock) {
            return res.status(400).json({ message: '❌ Nombre, precio y stock son obligatorios' });
        }

        const productId = await Product.create({ nombre, descripcion, precio, stock, imagen, categoria_id });
        res.status(201).json({ message: '✅ Producto creado correctamente', productId });
    } catch (error) {
        console.error('⛔ ERROR en createProduct:', error);
        res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, stock, imagen, categoria_id } = req.body;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: '❌ Producto no encontrado' });
        }

        await Product.update(id, { nombre, descripcion, precio, stock, imagen, categoria_id });

        res.status(200).json({ message: '✅ Producto actualizado correctamente' });
    } catch (error) {
        console.error('⛔ ERROR en updateProduct:', error);
        res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: '❌ Producto no encontrado' });
        }

        await Product.delete(id);
        res.status(200).json({ message: '✅ Producto eliminado correctamente' });
    } catch (error) {
        console.error('⛔ ERROR en deleteProduct:', error);
        res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};