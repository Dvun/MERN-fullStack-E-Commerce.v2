const express = require('express')
const {verifyToken, isAdmin} = require('../middlewares/authMiddleware')
const router = express.Router()
require('dotenv').config()
const {
  getAllProducts,
  newCreatedProducts,
  getProductById,
  getAllUserProducts,
  deleteUserProduct,
  updateProductByUser,
  createNewProduct,
  getAllProductsByAdmin,
  deleteProductByAdmin,
  updateProductByAdmin,
  createProductReview
} = require('../controllers/productController')


router.route('/admin')
  .get(verifyToken, isAdmin, getAllProductsByAdmin)

router.route('/admin/product/:id')
  .delete(verifyToken, isAdmin, deleteProductByAdmin)
  .put(verifyToken, isAdmin, updateProductByAdmin)

router.route('/add-product').post(verifyToken, createNewProduct)
router.route('/').get(getAllProducts)

router.route('/:id')
  .get(verifyToken, getAllUserProducts)
  .delete(verifyToken, deleteUserProduct)

router.route('/product/:id')
  .get(getProductById)
  .put(verifyToken, updateProductByUser)

router.route('/review/:id')
    .post(verifyToken, createProductReview)

router.route('/sort/:by').get(newCreatedProducts)




module.exports = router