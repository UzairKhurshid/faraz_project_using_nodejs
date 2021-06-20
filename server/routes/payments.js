const express=require('express')
const mongoose=require('mongoose')
const auth=require('../auth/index')
const User=require('../models/user')
const Product=require('../models/products')
const Stock=require('../models/stock')
const History=require('../models/history')
const Payment=require('../models/payment')
const Account=require('../models/account')


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



//if payment type == customer it means customer is paying you and his debit will be minus
//if payment type == vendor it meeans you are paying him

// {
//     "userID":"60cf04a34c5a1529947af108",
//     "paymentType":"vendor",
//     "historyID":"   60cf07fd8a1ee008c0fa03c3",
//     "amount":20,
//     "date":"18/06/2021"
    
// }


router.post('/payment',auth,async(req,res)=>{
    try{
        let paymentType = req.body.paymentType
        let historyID=req.body.historyID
        if(paymentType == "customer"){
                let payment=new Payment(req.body)
                await payment.save()
                let user=await User.findById({_id:mongoose.Types.ObjectId(req.body.userID)})
                user.debit=user.debit - req.body.amount
                await user.save()
                let account=await Account.findOne()
                account.amount=account.amount + req.body.amount
                await account.save()

                return res.status(200).json({
                    msg:"success",
                    payment:payment
                })
        }else if(paymentType == "vendor"){
            let payment=new Payment(req.body)
            await payment.save()
            let user=await User.findById({_id:mongoose.Types.ObjectId(req.body.userID)})
            user.debit=user.debit - req.body.amount
            await user.save()
            let account=await Account.findOne()
            account.amount=account.amount - req.body.amount
            await account.save()

            return res.status(200).json({
                msg:"success",
                payment:payment
            })
        }else{
            return res.status(400).json({
                msg:'error',
                error:"invalid payment type"
            })
        }
    }catch(err){
        console.log(err.message)
        return res.status(400).json({
            msg:'error',
            error:err.message
        })
    }
})





module.exports=router