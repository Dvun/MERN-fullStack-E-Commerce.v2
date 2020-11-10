const express = require('express')
require('dotenv').config()
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const startDB = require('./config/db')
const {userRouter, categoryRouter, productRouter, uploadRouter} = require('./routes')


dotenv.config()


// Middlewares
const app = express()
app.use(express.json({extended: true}))
app.use(express.urlencoded({extended: false}))
const folder = path.resolve()
app.use('/uploads', express.static(path.join(folder, '/uploads')));
app.use(cors())


// Routes
app.use('/api/users', userRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/products', productRouter)
app.use('/api/uploads', uploadRouter)


// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))
  app.get('/', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')
    ))
}


// Port connection
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})


// Database Connect
startDB()