const Category = require("../models/categoryModel");

// @desc Get all categories
// @route GET /api/categories
// @access Private
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Add new category
// @route POST /api/categories
// @access Private
const addCategory = async (req, res) => {
  const { name, type } = req.body;

  if (!name || !type) {
    return res.status(400).json({ message: "Please provide category name and type" });
  }

  try {
    const categoryExists = await Category.findOne({ name, user: req.user.id });
    if (categoryExists) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = new Category({ name, type, user: req.user.id });
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Delete category
// @route DELETE /api/categories/:id
// @access Private
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (category.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await category.deleteOne();
    res.status(200).json({ message: "Category removed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getCategories, addCategory, deleteCategory };
