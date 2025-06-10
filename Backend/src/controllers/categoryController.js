const Category = require("../models/Category");

// Obtener todas las categorías
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.getAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener categorías", error });
  }
};

// Obtener una categoría por ID
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.getById(id);

    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la categoría", error });
  }
};

// Crear una nueva categoría
const createCategory = async (req, res) => {
  try {
    const { nombre, imagen } = req.body;
    if (!nombre || !imagen) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const newCategory = await Category.create(nombre, imagen);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la categoría", error });
  }
};

// Actualizar una categoría
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, imagen } = req.body;

    const existingCategory = await Category.getById(id);
    if (!existingCategory) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    const updatedCategory = await Category.update(id, nombre, imagen);
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la categoría", error });
  }
};

// Eliminar una categoría
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const existingCategory = await Category.getById(id);
    if (!existingCategory) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    await Category.delete(id);
    res.json({ message: `Categoría con ID ${id} eliminada` });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la categoría", error });
  }
};

module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };