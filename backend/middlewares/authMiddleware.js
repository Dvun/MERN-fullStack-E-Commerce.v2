const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()


exports.generatedToken = (id) => {
  return jwt.sign({id}, process.env.SECRET, {expiresIn: '30d'})
}

exports.verifyToken = async (req, res, next) => {
  let token
  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
      const decoded = await jwt.verify(token, process.env.SECRET)
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } else {
      return res.status(401).json({msg: 'Not authorized, token failed!'})
    }
  } catch (e) {
    console.error(e)
    return res.status(500).json({msg: 'Server error'})
  }
}

exports.isAdmin = async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401).json('Not authorized as an Admin!')
  }
}