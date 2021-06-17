const express=require('express')
const mongoose=require('mongoose')
const auth=require('../auth/index')
const User=require('../models/user')
const router=new express.Router()


router.get('/users',auth,async(req,res)=>{
    try {
        let admins=await User.find({role:'admin'})
        let users=await User.find({role:'user'})
        
        return res.status(200).json({
            msg:"Success",
            admins:admins,
            users:users
        })
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({
            msg:"Error",
            error:err.message
        })
    }
})


router.get('/user/:id',auth,async(req,res)=>{
    try {
        let userID=req.params.id
        let user=await User.findById({_id:mongoose.Types.ObjectId(userID)})
        if(!user){
            return res.status(400).json({
                msg:"error",
                error:"User not found"
            })
        }

        return res.status(200).json({
            msg:"Success",
            user:user
        })
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({
            msg:"Error",
            error:err.message
        })
    }
})

router.get('/customersVendors',auth,async(req,res)=>{
    try {
        let customers=await User.find({role:'customer'})
        let vendors=await User.find({role:'vendor'})
        
        return res.status(200).json({
            msg:"Success",
            customers:customers,
            vendors:vendors
        })
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({
            msg:"Error",
            error:err.message
        })
    }
})


router.get('/customersVendor/:id',auth,async(req,res)=>{
    try {
        let userID=req.params.id
        let user=await User.findById({_id:mongoose.Types.ObjectId(userID)})
        if(!user){
            return res.status(400).json({
                msg:"error",
                error:"Customer/Vendor not found"
            })
        }

        return res.status(200).json({
            msg:"Success",
            user:user
        })
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({
            msg:"Error",
            error:err.message
        })
    }
})



router.post('/createUser',auth,async(req,res)=>{
    try {
        let user=new User(req.body)
        await user.save()

        return res.status(200).json({
            msg:"Success",
            user:user
        })
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({
            msg:"Error",
            error:err.message
        })
    }
})


router.post('/updateUser',auth,async(req,res)=>{
    try {
        let userID=req.body.userID
        let user=await User.findById({_id:mongoose.Types.ObjectId(userID)})
        if(!user){
            return res.status(400).json({
                msg:"error",
                error:"User not found"
            })
        }

        if(req.body.username){
            user.username=req.body.username
        }
        if(req.body.role){
            user.role=req.body.role
        }
        if(req.body.email){
            user.email=req.body.email
        }
        if(req.body.password){
            user.password=req.body.password
        }
        if(req.body.avatar){
            user.avatar=req.body.avatar
        }
        if(req.body.debit){
            user.avatar=req.body.avatar
        }
        if(req.body.debit){
            user.avatar=req.body.avatar
        }

        await user.save()
        
        return res.status(200).json({
            msg:"Success",
            user:user
        })
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({
            msg:"Error",
            error:err.message
        })
    }
})


router.get('/deleteUser/:id',auth,async(req,res)=>{
    try {
        let userID=req.params.id
        let user=await User.findByIdAndDelete({_id:mongoose.Types.ObjectId(userID)})
        
        return res.status(200).json({
            msg:"Success",
        })
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({
            msg:"Error",
            error:err.message
        })
    }
})



module.exports=router