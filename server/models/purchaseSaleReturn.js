const mongoose = require('mongoose')

const purchaseSaleReturnSchema = new mongoose.Schema({

    productID: {
        type: String,
        ref:"Product"
    },
    historyID:{
        type:String,
        ref:"History"
    },
    userID:{
        type:String,
        ref:"User"
    },
    type: {
        type: String,
    },
    quantity:{
        type:Number
    },
    purchaseUnitPrice:{
        type:Number
    },
    saleUnitPrice:{
        type:Number
    },
    totalPrice:{
        type:Number
    },
    cash:{
        type:Number
    },
    debit:{
        type:Number
    },
})




const purchaseSaleReturn = mongoose.model('purchaseSaleReturn', purchaseSaleReturnSchema)
module.exports = purchaseSaleReturn