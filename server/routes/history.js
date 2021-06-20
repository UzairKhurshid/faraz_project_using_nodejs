const express=require('express')
const mongoose=require('mongoose')
const auth=require('../auth/index')
const User=require('../models/user')
const Product=require('../models/products')
const Account=require('../models/account')
const Stock=require('../models/stock')
const History=require('../models/history')
const Payment=require('../models/payment')

const router=new express.Router()




router.get('/history',auth,async(req,res)=>{
    try{
        let history=await History.find().populate('productID').populate('userID')
        if(!history){
            return res.status(200).json({
                msg:"success",
                history:null
            })    
        }

        return res.status(200).json({
            msg:"success",
            history:history
        })
    }catch(err){
        console.log(err.message)
        return res.status(400).json({
            msg:'error',
            error:err.message
        })
    }
})



router.get('/historyPayments/:id',auth,async(req,res)=>{
    try{
        let historyID=req.params.id
        let history=await History.findById({_id:mongoose.Types.ObjectId(historyID)}).populate('productID').populate('userID')
        if(!history){
            return res.status(200).json({
                msg:"success",
                history:null
            })    
        }
        let payments=await Payment.find({historyID:historyID})

        return res.status(200).json({
            msg:"success",
            history:history,
            payments:payments
        })
    }catch(err){
        console.log(err.message)
        return res.status(400).json({
            msg:'error',
            error:err.message
        })
    }
})





module.exports=router