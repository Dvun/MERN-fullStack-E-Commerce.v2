const express = require('express')
const router = express.Router()
const {categoryValidator} = require('../validators/validator')
const {verifyToken, isAdmin} = require('../middlewares/authMiddleware')
const {addCategory, categoryById, editCategory, deleteCategory, getAllCategories} = require('../controllers/categoryController')



router.post('/category/add-category', categoryValidator, verifyToken, isAdmin, addCategory)
router.put('/category/edit-category/:id', verifyToken, isAdmin, categoryById, editCategory)
router.delete('/category/:id', verifyToken, isAdmin, categoryById, deleteCategory)
router.get('/', getAllCategories)



module.exports = router