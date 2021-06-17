const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true
    },
    key: {
        type: String,
        trim: true,
        required: true
    },
    purchaseUnitPrice:{
        type:Number
    },
    saleUnitPrice:{
        type:String
    },
    avatar:{
        type:String
    }
})




const Product = mongoose.model('Product', productSchema)
module.exports = Product