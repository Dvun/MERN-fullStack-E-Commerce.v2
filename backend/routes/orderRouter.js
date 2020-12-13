const express = require('express')
const router = express.Router()
const {verifyToken, isAdmin} = require('../middlewares/authMiddleware')
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getAllOrders,
  // deleteOrderByAdmin,
  updateOrderToDelivered
} = require('../controllers/orderController')


router.route('/')
  .post(verifyToken, addOrderItems)
  .get(verifyToken, isAdmin, getAllOrders)
router.get('/myorders', verifyToken, getMyOrders)
router.get('/:id', verifyToken, getOrderById)
router.put('/:id/pay', verifyToken, updateOrderToPaid)
router.put('/:id/deliver', verifyToken, isAdmin, updateOrderToDelivered)
// router.delete('/order/:id', verifyToken, isAdmin, deleteOrderByAdmin)


module.exports = router