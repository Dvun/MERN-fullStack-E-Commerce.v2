const Order = require('../models/order')
const Product = require('../models/product')
const asyncHandler = require('express-async-handler')


exports.addOrderItems = async (req, res) => {
  const {
    user,
    seller,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body
  try {
    if (orderItems && orderItems.length === 0) {
      return res.status(404).json('No order items!')
    } else {
      const order = await new Order({
        user,
        seller,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })
      const createdOrder = await order.save()
      res.status(201).json(createdOrder)
    }
  } catch (e) {
    res.status(500).json('Server error!')
  }
}
exports.getOrderById = async (req, res) => {
  const id = await req.params.id
  try {
    const order = await Order.findById(id).populate('user', 'name email')
    if (order) {
      res.json(order)
    } else {
      return res.status(404).json('Order not found!')
    }
  } catch (e) {
    res.status(500).json('Server error!')
  }
}
exports.updateOrderToPaid = async (req, res) => {
  const id = await req.params.id
  try {
    const orders = await Order.findById(id).populate('product')
    if (orders) {
      orders.isPaid = true
      orders.paidAt = Date.now()
      orders.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      }
      for (i = 0; i < orders.orderItems.length; i++) {
        await Product.findByIdAndUpdate(orders.orderItems[i]._id, {$inc: {countInStock: - orders.orderItems[i].qty}})
      }
      const updatedOrder = await orders.save()
      res.json(updatedOrder)
    } else {
      return res.status(404).json('Order not found!')
    }
  } catch (e) {
    res.status(500).json('Server error!')
  }
}
exports.updateOrderToDelivered = async (req, res) => {
  const id = await req.params.id
  try {
    const order = await Order.findById(id)
    if (order) {
      order.isDelivered = true
      order.deliveredAt = Date.now()
      const updatedOrder = await order.save()
      res.json(updatedOrder)
    } else {
      return res.status(404).json('Order not found!')
    }
  } catch (e) {
    res.status(500).json('Server error!')
  }
}
exports.getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({user: req.user._id})
  res.json(orders)
})
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user')
    if (orders) {
      res.json(orders)
    } else {
      return res.status(404).json('Orders not found!')
    }
  } catch (e) {
    res.status(500).json('Server error!')
  }
}
// exports.deleteOrderByAdmin = async (req, res) => {
//   try {
//     const order = await Order.findByIdAndDelete(req.params.id)
//     if (order) {
//       res.status(201).json('Order deleted successfully!')
//     } else {
//       res.status(404).json('Order not found!')
//     }
//   } catch (e) {
//     res.status(500).json('Server error!')
//   }
// }