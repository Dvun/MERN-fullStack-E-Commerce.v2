const Category = require('../models/category')


exports.categoryById = async (req, res, next) => {
  const categoryId = req.params.id
  try {
    const category = await Category.findById(categoryId)
    if (!category) {
      return res.status(403).json({msg: 'Category not found'})
    }
    req.category = await category
    next()
  } catch (e) {
    res.status(500).json({msg: 'Server error'})
  }
}

exports.addCategory = async (req, res) => {
  const categoryWithSameName = await Category.findOne({...req.body})
  try {

    const category = await new Category(req.body)
    if (!category.name) {
      return res.status(403).json({msg: 'Category name is required!'})
    }
    if (categoryWithSameName && categoryWithSameName.name === category.name) {
      return res.status(403).json({msg: 'Category name need be unique!'})
    }
    category.save()
    res.json({msg: 'Category created!'})
  } catch (e) {
    res.status(500).json({msg: 'Server error'})
  }
}

exports.editCategory = async (req, res) => {
  const category = req.category
  category.name = req.body.name
  try {
    await category.save()
    if (!category) {
      return res.status(403).json({msg: 'Category not found'})
    }
    res.status(201).json({msg: 'Category changed successfully!'})
  } catch (e) {
    console.log(e)
    res.status(500).json({msg: 'Category name need be unique!'})
  }
}

exports.deleteCategory = async (req, res) => {
  const category = req.category
  try {
    await category.delete()
    res.status(201).json({msg: 'Category deleted successfully!'})
  } catch (e) {
    res.status(500).json({msg: 'Server error'})
  }
}

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    res.json(categories)
  } catch (e) {
    res.status(500).json({msg: 'Server error'})
  }
}