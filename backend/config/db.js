const mongoose = require('mongoose')


const startDB = async () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    console.log(`MongoDB connected`)
  } catch (e) {
    console.error(`Error: ${e.message}`)
    process.exit(1)
  }
}

module.exports = startDB