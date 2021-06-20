require('dotenv').config()
require('./db/index')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
var cors = require('cors') 
const hbs=require('hbs')
const app = express()


const port = process.env.PORT

const publicDirectory=path.join(__dirname,'../public') 
const viewsDirectory=path.join(__dirname,'../views')

app.set('view engine', 'hbs'); 
app.set('views',viewsDirectory)
app.use(express.static(publicDirectory))
app.use(cors()) 
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname,'../../public')));

const authRoute = require('./routes/authentication')
const userRoute = require('./routes/user')
const productRoute = require('./routes/products')
const stockRoute = require('./routes/stock')
const accountRoute = require('./routes/account')
const paymentRoute = require('./routes/payments')
const purchaseSaleReturnRoute = require('./routes/purchaseSaleReturn')
const profileRoute = require('./routes/profile')


app.use(authRoute)
app.use(userRoute)
app.use(productRoute)
app.use(stockRoute)
app.use(accountRoute)
app.use(paymentRoute)
app.use(purchaseSaleReturnRoute)
app.use(profileRoute)



app.get('/',async(req,res)=>{
    try{
        return res.render('index')
    }catch(err){
        console.log(err.message)
    }
})

app.listen(port, () => {
    console.log('listning on port ' + port)
})