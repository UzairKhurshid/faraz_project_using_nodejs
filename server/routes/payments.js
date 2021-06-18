const express=require('express')
const mongoose=require('mongoose')
const auth=require('../auth/index')
const User=require('../models/user')
const Product=require('../models/products')
const Stock=require('../models/stock')
const History=require('../models/history')
const Payment=require('../models/payment')

const router=new express.Router()

router.get('/payments',auth,async(req,res)=>{
    try{
        let payment=await Payment.find().populate('historyID')

        if(!payment){
            return res.status(200).json({
                msg:"success",
                payment:null
            })    
        }

        return res.status(200).json({
            msg:"success",
            payment:payment
        })
    }catch(err){
        console.log(err.message)
        return res.status(400).json({
            msg:'error',
            error:err.message
        })
    }
})



router.get('/payment/:id',auth,async(req,res)=>{
    try{
        let paymentID=req.params.id
        let payment=await Payment.findById({_id:mongoose.Types.ObjectId(paymentID)})
        

        if(!payment){
            return res.status(200).json({
                msg:"success",
                payment:null,
                history:null
            })    
        }

        let history=await History.findById({_id:mongoose.Types.ObjectId(payment.historyID)}).populate('productID').populate('userID')
        if(!history){
            return res.status(200).json({
                msg:"success",
                payment:payment,
                history:null
            })    
        }

        return res.status(200).json({
            msg:"success",
            payment:payment,
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



router.post('/payment',auth,async(req,res)=>{
    try{
        let payment=new Payment(req.body)
        await payment.save()


        let user=await User.findById({_id:mongoose.Types.ObjectId(req.body.userID)})
        if(user.role == "vendor"){
            user.debit=user.debit - req.body.amount
        }else if(user.role == "customer"){
            user.debit=user.debit + req.body.amount
        }
        await user.save()

        return res.status(200).json({
            msg:"success",
            payment:payment
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