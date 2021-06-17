require('dotenv').config()
require('./db/index')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()


const port = process.env.PORT
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
    



const authRoute = require('./routes/authentication')
const userRoute = require('./routes/user')
const productRoute = require('./routes/products')
const stockRoute = require('./routes/stock')
const accountRoute = require('./routes/account')
const profileRoute = require('./routes/profile')


app.use(authRoute)
app.use(userRoute)
app.use(productRoute)
app.use(stockRoute)
app.use(accountRoute)
app.use(profileRoute)


app.listen(port, () => {
    console.log('listning on port ' + port)
})