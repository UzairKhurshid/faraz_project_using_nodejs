const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({

    historyID: {
        type: String,
        ref:'History'
    },
    userID:{
        type:String,
        ref:"User"
    },
    paymentType:{
        type:String
    },
    amount:{
        type:Number,
    },
    date:{
        type:String,
        required:true
    },
    
},{timestamps:true})




const Payment = mongoose.model('Payment', paymentSchema)
module.exports = Payment