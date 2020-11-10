const express = require('express')
const router = express.Router()
const {verifyToken, isAdmin} = require('../middlewares/authMiddleware')
const {validationMiddleware} = require('../middlewares/validationMiddleware')
const {registerValidator, loginValidator} = require('../validators/validator')
const {
  findUserById,
  editUserProfile,
  getAllUsers,
  loginUser,
  registerUser,
  deleteUserProfile,
  getUserProfile,
  updateUserProfileByAdmin
} = require('../controllers/userController')



router.route('/admin').get(verifyToken, isAdmin, getAllUsers)

router.post('/login', loginValidator, validationMiddleware, loginUser)

router.post('/register',registerValidator, validationMiddleware, registerUser)

router.route('/:id')
  .get(verifyToken, isAdmin, findUserById)
  .put(verifyToken, isAdmin, updateUserProfileByAdmin)
  .delete(verifyToken, isAdmin, deleteUserProfile)

router.route('/user/edit-profile')
  .get(verifyToken, getUserProfile)
  .put(verifyToken, editUserProfile)




module.exports = router