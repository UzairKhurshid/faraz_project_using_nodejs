const mongoose = require('mongoose')

const historySchema = new mongoose.Schema({

    productID: {
        type: String,
        ref:'Product'
    },
    quantity: {
        type: Number
    },
    //type ==> purchase/sale
    type:{
        type:String
    },
    //purchaseUnitPrice when type=purchase
    purchaseUnitPrice:{
        type:Number
    },
    //saleUnitPrice when type=sale
    saleUnitPrice:{
        type:Number
    },
    totalPrice:{
        type:String
    },
    userID:{
        type:String,
        ref:"User"
    }
    
},{timestamps:true})




const History = mongoose.model('History', historySchema)
module.exports = History