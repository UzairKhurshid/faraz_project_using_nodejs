const mongoose = require('mongoose')

const stockSchema = new mongoose.Schema({

    productID: {
        type: String,
        ref:'Product'
    },
    quantity: {
        type: Number
    }
    
})




const Stock = mongoose.model('Stock', stockSchema)
module.exports = Stock