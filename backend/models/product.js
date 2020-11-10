const {model, Schema, ObjectId} = require('mongoose')


const reviewSchema = new Schema({
  name: {type: String, required: true},
  rating: {type: Number, required: true},
  comment: {type: String, required: true},
}, {timestamps: true
})


const productSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    trim: true,
    required: true,
    maxLength: 20
  },
  description: {
    type: JSON,
    required: true
  },
  price: {
    type: Number,
    required: true,
    trim: true,
    default: 0
  },
  category: {
    type: ObjectId,
    ref: 'Category',
    required: true
  },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0
  },
  countInStock: {
    type: Number,
    default: 0,
    required: true
  },
  sold: {
    type: Number,
    default: 0,
    required: true
  },
  picturePath: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})


module.exports = model('Product', productSchema)