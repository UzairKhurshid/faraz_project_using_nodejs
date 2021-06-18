const mongoose = require('mongoose')

const historySchema = new mongoose.Schema({

    productID: {
        type: String,
        ref:'Product'
    },
    userID:{
        type:String,
        ref:"User"
    },
     //type ==> purchase/sale
    type:{
        type:String,
        required:true
    },
    quantity: {
        type: Number,
    },
    totalPrice:{
        type:String,
    },
    discount:{
        type:Number,
        default:0,
    },
    
    //purchaseUnitPrice when type=purchase
    purchaseUnitPrice:{
        type:Number,
    },
    //saleUnitPrice when type=sale
    saleUnitPrice:{
        type:Number,
    },
    date:{
        type:String,
        required:true
    },
    cash:{
        type:Number,
        default:0
    },
    debit:{
        type:Number,
        default:0
    }
    
},{timestamps:true})




const History = mongoose.model('History', historySchema)
module.exports = History