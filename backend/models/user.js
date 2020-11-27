const {model, Schema} = require('mongoose')
const bcrypt = require('bcryptjs')


const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxLength: 15
  },
  surname: {
    type: String,
    trim: true,
    required: true,
    maxLength: 15
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
    index: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  address: {
    type: String,
    trim: true,
    required: true
  },
  city: {
    type: String,
    trim: true,
    required: true
  },
  postalCode: {
    type: String,
    trim: true,
    required: true
  },
  country: {
    type: String,
    trim: true,
    required: true
  },
  productsCount: {
    type: Number,
    default: 0,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true
  },
  isSeller: {
    type: Boolean,
    default: false,
    required: true
  }
}, {
  timestamps: true
})

// Password Control middleware
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Password crypt middleware for user registering
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})


module.exports = model('User', userSchema)