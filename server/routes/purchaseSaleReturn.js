const express=require('express')
const mongoose=require('mongoose')
const auth=require('../auth/index')
const User=require('../models/user')
const Product=require('../models/products')
const Account=require('../models/account')
const Stock=require('../models/stock')
const History=require('../models/history')
const Payment=require('../models/payment')
const purchaseSaleReturn=require('../models/purchaseSaleReturn')


const router=new express.Router()


router.get('/purchaseSaleReturn',auth,async(req,res)=>{
    try{
        let p=await purchaseSaleReturn.find().populate('productID').populate('userID').populate('historyID')


        return res.status(200).json({
            msg:"success",
            data:p
        })
    }catch(err){
        console.log(err.message)
        return res.status(400).json({
            msg:'error',
            error:err.message
        })
    }
})


router.post('/purchaseReturn',auth,async(req,res)=>{
    try{
        let productID=req.body.productID
        let userID=req.body.userID
        let quantity=req.body.quantity
        let type=req.body.type
        let totalPrice=req.body.totalPrice
        let purchaseUnitPrice=req.body.purchaseUnitPrice
        let cash=req.body.cash
        let debit=req.body.debit



        let stock=await Stock.findOne({productID:productID})
        stock.quantity=stock.quantity - quantity
        await stock.save()

        let vendor=await User.findById({_id:mongoose.Types.ObjectId(userID)})
        vendor.debit=vendor.debit - debit
        await vendor.save()
        
        let acc=await Account.findOne()
        acc.amount = acc.amount + cash
        await acc.save()
        
        let p=new purchaseSaleReturn(req.body)
        await p.save()


        return res.status(200).json({
            msg:"success",
        })
    }catch(err){
        console.log(err.message)
        return res.status(400).json({
            msg:'error',
            error:err.message
        })
    }
})



router.post('/saleReturn',auth,async(req,res)=>{
    try{
        let productID=req.body.productID
        let userID=req.body.userID
        let quantity=req.body.quantity
        let type=req.body.type
        let totalPrice=req.body.totalPrice
        let purchaseUnitPrice=req.body.purchaseUnitPrice
        let cash=req.body.cash
        let debit=req.body.debit



        let stock=await Stock.findOne({productID:productID})
        stock.quantity=stock.quantity + quantity
        await stock.save()

        let customer=await User.findById({_id:mongoose.Types.ObjectId(userID)})
        customer.debit=customer.debit - debit
        await customer.save()
        
        let acc=await Account.findOne()
        acc.amount = acc.amount - cash
        await acc.save()
        
        let p=new purchaseSaleReturn(req.body)
        await p.save()


        return res.status(200).json({
            msg:"success",
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