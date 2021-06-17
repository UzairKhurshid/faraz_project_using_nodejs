const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({

    amount: {
        type: Number,
        default:0
    },
    
})




const Account = mongoose.model('Account', accountSchema)
module.exports = Account