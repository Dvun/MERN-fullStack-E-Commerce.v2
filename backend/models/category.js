const {model, Schema} = require('mongoose')


const categorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxLength: 32,
    unique: true
  },
  products: {
    type: Number,
    default: 0,
    required: true,
    min: 0
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})


module.exports = model('Category', categorySchema)