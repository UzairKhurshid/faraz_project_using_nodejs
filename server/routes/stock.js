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

router.get('/stock',auth,async(req,res)=>{
    try{
        let stock=await Stock.find().populate('productID')

        return res.status(200).json({
            msg:"success",
            stock:stock
        })
    }catch(err){
        console.log(err.message)
        return res.status(400).json({
            msg:'error',
            error:err.message
        })
    }
})

router.post('/addStock',auth,async(req,res)=>{
    try{
        let stock=new Stock(req.body)
        await stock.save()

        return res.status(200).json({
            msg:"success",
            stock:stock
        })
    }catch(err){
        console.log(err.message)
        return res.status(400).json({
            msg:'error',
            error:err.message
        })
    }
})

router.post('/updateStock',auth,async(req,res)=>{
    try{
        let stockID=req.body.stockID
        let stock=await Stock.findById({_id:mongoose.Types.ObjectId(stockID)})
        if(!stock){
            return res.status(400).json({
                msg:"error",
                error:"Invalid Stock ID. stock not found."
            })
        }
        if(req.body.quantity){
            stock.quantity=req.body.quantity
        }

        await stock.save()
        return res.status(200).json({
            msg:"success",
            stock:stock
        })
    }catch(err){
        console.log(err.message)
        return res.status(400).json({
            msg:'error',
            error:err.message
        })
    }
})







/////////////////////////////////////////history/////////////////////////////////////////////////

router.post('/purchase',auth,async(req,res)=>{
    try{
        let reqData=req.body
        let history=new History(req.body)
        await history.save()

        //updating stock
        let stock=await Stock.findOne({productID:req.body.productID})
        if(!stock){
            let newStock=new Stock()
            newStock.productID=req.body.productID
            newStock.quantity=req.body.quantity
            await newStock.save()   

            let account=await Account.findOne()
            let cash=req.body.cash
            let debit=req.body.debit
            account.amount=account.amount - cash
            await account.save()

            let vendor=await User.findById({_id:mongoose.Types.ObjectId(req.body.userID)})  
            vendor.debit=vendor.debit + debit
            await vendor.save()

        
            return res.status(200).json({
                msg:"success",
                history:history
            })
        }
        stock.quantity=stock.quantity + req.body.quantity
        await stock.save()
        
        //updating currentAmount
        let account=await Account.findOne()
            let cash=req.body.cash
            let debit=req.body.debit
            account.amount=account.amount - cash
            await account.save()

        //updating vendor credit debit
        let vendor=await User.findById({_id:mongoose.Types.ObjectId(req.body.userID)})  
            vendor.debit=vendor.debit + debit
            await vendor.save()

        
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

router.post('/sale',auth,async(req,res)=>{
    try{
        let reqData=req.body
        let history=new History(req.body)
        await history.save()

        //updating stock
        let stock=await Stock.findOne({productID:req.body.productID})
        stock.quantity=stock.quantity - req.body.quantity
        await stock.save()
        
        //updating currentAmount
        let account=await Account.findOne()
            let cash=req.body.cash
            let debit=req.body.debit
            account.amount=account.amount + cash
            await account.save()

        //updating customer credit debit
        let customer=await User.findById({_id:mongoose.Types.ObjectId(req.body.userID)})  
            customer.debit=customer.debit + debit
            await customer.save()

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




module.exports=router