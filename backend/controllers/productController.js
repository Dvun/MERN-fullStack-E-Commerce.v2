const Product = require('../models/product')
const User = require('../models/user')
const path = require('path')
const Category = require('../models/category')
const fs = require('fs')
require('dotenv').config()


exports.getAllProducts = async (req, res) => {
  const pageSize = 6
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword ? {
    title: {
      $regex: req.query.keyword,
      $options: 'i',
    },
  } : {}
  const count = await Product.countDocuments({...keyword})
  try {
    await productsPictureControl()
    let products = await Product.find({...keyword}).populate('userId').limit(pageSize).skip(pageSize * (page - 1))
    if (products) {
      res.json({products, page, pages: Math.ceil(count / pageSize)})
    }
  } catch (e) {
    res.status(500).json({msg: 'Server error'})
  }
}
exports.getProductById = async (req, res) => {
  const {id} = req.params
  try {
    const product = await Product.findById(id).populate('category').populate('user')
    if (product) {
      res.json(product)
    } else {
      return res.status(401).json({msg: 'Product not found!'})
    }
  } catch (e) {
    res.status(500).json({msg: 'Server error'})
  }
}
exports.getAllUserProducts = async (req, res) => {
  try {
    const products = await Product.find({userId: req.params.id}).populate('userId').populate('category')
    if (products) {
      res.json(products)
    } else {
      return res.status(400).json({msg: 'Products not found'})
    }
  } catch (e) {
    res.status(500).json({msg: 'Server error'})
  }
}
exports.createNewProduct = async (req, res) => {
  try {
    const newProduct = {
      userId: req.body.userId,
      category: req.body.category,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      countInStock: req.body.countInStock,
      picturePath: req.body.picturePath,
      fileName: req.body.fileName,
    }
    const product = await new Product(newProduct)
    if (product) {
      let error = product.validateSync()
      if (error === undefined) {
        const user = await User.findByIdAndUpdate(req.body.userId, {$inc: {productsCount: +1}})
        const category = await Category.findByIdAndUpdate(req.body.category, {$inc: {products: +1}})
        res.status(201).json({msg: 'New Product created!'})
        product.save()
      } else {
        return res.status(400).json({msg: 'Something wrong with product!'})
      }
    }
  } catch (e) {
    res.status(500).json({msg: 'Server error!'})
  }
}
exports.deleteUserProduct = async (req, res) => {
  await deleteProduct(req, res)
}
exports.newCreatedProducts = async (req, res) => {
  try {
    const products = await Product.find().sort('-createdAt').limit(4)
    if (!products) {
      return res.status(400).json({msg: 'Products not found'})
    }
    res.json(products)
  } catch (e) {
    res.status(500).json({msg: 'Server error!'})
  }
}
exports.updateProductByUser = async (req, res) => {
  await updateProduct(req, res)
}
exports.createProductReview = async (req, res) => {
  const {rating, comment} = req.body
  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      const alreadyReviewed = await product.reviews.find(review => review.userId.toString() === req.user._id.toString())
      if (alreadyReviewed) {
        return res.status(400).json({msg: 'Product already reviewed!'})
      } else {
        const review = {
          name: req.user.name,
          rating: Number(rating),
          comment,
          userId: req.user._id,
        }
        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
        await product.save()
        res.status(201).json({msg: 'Review added!'})
      }
    }
  } catch (e) {
    res.status(500).json({msg: 'Server error'})
  }
}


// Admin controllers
exports.getAllProductsByAdmin = async (req, res) => {
  try {
    await productsPictureControl()
    let products = await Product.find().populate('userId').populate('category')
    if (products) {
      res.json(products)
    }
  } catch (e) {
    res.status(500).json({msg: 'Server error'})
  }
}
exports.deleteProductByAdmin = async (req, res) => {
  await deleteProduct(req, res)
}
exports.updateProductByAdmin = async (req, res) => {
  await updateProduct(req, res)
}


// Functions
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.body._id, {
      userId: req.body.userId,
      category: req.body.category,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      countInStock: req.body.countInStock,
      picturePath: req.body.picturePath,
      fileName: req.body.fileName,
    }).populate('category').populate('user')
    if (product) {
      if (product.category._id !== req.body.category) {
        await Category.findByIdAndUpdate(req.body.category, {$inc: {products: +1}})
        await Category.findByIdAndUpdate(product.category._id, {$inc: {products: -1}})
        if (req.body.fileName !== product.fileName) {
          const folder = path.join(path.resolve(), '/uploads')
          fs.unlink(`${folder}/${product.fileName}`, (err) => {
            if (!err) {
              console.log('file deleted!')
            } else {
              console.log(err)
            }
          })
        }
      }
      res.status(200).json({msg: 'Product Updated!'})
    } else {
      return res.status(401).json({msg: 'Product not found!'})
    }
  } catch (e) {
    res.status(500).json({msg: 'Server error'})
  }
}
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id).populate('category').populate('userId')
    if (product) {
      console.log(product)
      const folder = path.join(path.resolve(), '/uploads')
      fs.unlink(`${folder}/${product.fileName}`, (err) => {
        if (!err) {
        } else {
          console.log(err)
        }
      })
      const user = await User.findByIdAndUpdate(product.userId._id, {$inc: {productsCount: -1}})
      const category = await Category.findByIdAndUpdate(product.category._id, {$inc: {products: -1}})
      res.status(201).json({msg: 'Product deleted !'})
    } else {
      return res.status(400).json({msg: 'Products not found'})
    }
  } catch (e) {
    res.status(500).json({msg: 'Server error'})
  }
}
const productsPictureControl = async () => {
  const pictureControl = await Product.find()
  if (pictureControl) {
    const folder = path.join(path.resolve(), '/uploads')
    let files = fs.readdirSync(folder)
    pictureControl.map(prod => {
      files = files.filter(file => !prod.fileName.includes(file))
    })
    files.map(file => {
      fs.unlink(`${folder}/${file}`, (err) => {
        if (!err) {
        } else {
          console.log(err)
        }
      })
    })
  }
}