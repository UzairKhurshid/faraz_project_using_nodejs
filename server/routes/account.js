const express=require('express')
const mongoose=require('mongoose')
const auth=require('../auth/index')
const Account=require('../models/account')
const router=new express.Router()

router.get('/account',auth,async(req,res)=>{
    try {
        let acc=await Account.findOne()
        if(!acc){
            return res.status(200).json({
                msg:"Success",
                account:null
            })
        }
        return res.status(200).json({
            msg:"Success",
            account:acc
        })    
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({
            msg:"Error",
            error:err.message
        })
    }
})

router.post('/updateAccount',auth,async(req,res)=>{
    try {
        let acc=await Account.findOne()
        if(!acc){
            let newAcc=new Account()
            newAcc.amount=req.body.amount;
            await newAcc.save()

            return res.status(200).json({
                msg:"Success",
                account:newAcc
            })
        }else{
            acc.amount=req.body.amount;
            await acc.save()

            return res.status(200).json({
                msg:"Success",
                account:acc
            })
        }
        
        
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({
            msg:"Error",
            error:err.message
        })
    }
})




module.exports=router