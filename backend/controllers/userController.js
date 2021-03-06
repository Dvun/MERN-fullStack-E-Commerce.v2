const User = require('../models/user')
const {generatedToken} = require('../middlewares/authMiddleware')
const {validationResult} = require('express-validator')


exports.registerUser = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }
  try {
    const {name, surname, email, password, address, city, postalCode, country} = req.body
    let existUser = await User.findOne({email})
    if (existUser) {
      return res.status(422).send({msg: `User with email: ${email} already exist`})
    }
    const user = await new User({
      name,
      surname,
      email,
      password,
      address,
      city,
      postalCode,
      country
    })
    res.status(201).json({msg: 'User registered, now You can Login!'})
    user.save()
  } catch (e) {
    res.status(500).json({errMessage: 'Server error'})
  }
}
exports.loginUser = async (req, res) => {
  const {email, password} = req.body
  try {
    const user = await User.findOne({email})
    if (!user) {
      return res.status(422).json({msg: `User with email: ${email} not found`})
    }
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        address: user.address,
        city: user.city,
        postalCode: user.postalCode,
        country: user.country,
        productsCount: user.productsCount,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller,
        token: generatedToken(user._id),
      })
    } else {
      return res.status(422).json({msg: 'Email or password is not correct'})
    }
  } catch (e) {
    res.status(500).json({errMessage: 'Server error'})
  }
}
exports.findUserById = async (req, res) => {
  try {
    let user = await User.findById(req.params.id)
    if (!user) {
      return res.status(422).json({msg: 'User not found'})
    } else {
      res.json({
        _id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        address: user.address,
        city: user.city,
        postalCode: user.postalCode,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller,
      })
    }
  } catch (e) {
    res.status(500).json({msg: 'Server error'})
  }
}
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    if (!users) {
      return res.status(403).json({msg: 'Users not found!'})
    }
    res.json(users)
  } catch (e) {
    res.status(500).json({msg: 'Server error'})
  }
}
exports.editUserProfile = async (req, res) => {
  try {
    await findAndUpdateUser(req, res)
  } catch (e) {
    console.log(e)
    res.status(500).json({msg: 'Server error'})
  }
}
exports.updateUserProfileByAdmin = async (req, res) => {
  try {
    await findAndUpdateUser(req, res)
  } catch (e) {
    res.status(500).json({msg: 'Server error'})
  }
}
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        address: user.address,
        city: user.city,
        postalCode: user.postalCode,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller,
      })
    } else {
      return res.status(400).json({msg: 'User not found'})
    }
  } catch (e) {
    res.status(500).json({msg: 'Server error'})
  }
}
exports.deleteUserProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    res.status(201).json({msg: `User ${user.name}, profile deleted!`})
  } catch (e) {
    console.log(e)
    res.status(500).json({msg: 'Server error'})
  }
}


const findAndUpdateUser = async (req, res) => {
  const user = await User.findById(req.body._id)
  if (user) {
    user.name = req.body.name || user.name
    user.surname = req.body.surname || user.surname
    user.email = req.body.email || user.email
    user.address = req.body.address || user.address
    user.city = req.body.city || user.city
    user.postalCode = req.body.postalCode || user.postalCode
    user.country = req.body.country || user.country
    user.isAdmin = req.body.isAdmin
    user.isSeller = req.body.isSeller
    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      surname: updatedUser.surname,
      email: updatedUser.email,
      address: updatedUser.address,
      city: updatedUser.city,
      postalCode: updatedUser.postalCode,
      country: updatedUser.country,
      isAdmin: updatedUser.isAdmin,
      isSeller: updatedUser.isSeller,
      token: generatedToken(updatedUser._id),
    })
  } else {
    return res.status(400).json({msg: 'User not found'})
  }
}