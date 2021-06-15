const express=require('express')
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const User=require('../models/user')
const router=new express.Router()


router.get('/login',async(req,res)=>{
    try {
        const email=req.query.email
        const password=req.query.password
        const role=req.query.role

        const user=await User.findOne({email:email})
        if(!user){
            return res.status(400).json({
                msg:"error",
                error:"Invalid Email"
            })
        }

        let chkPassword=await bcrypt.compare(password,user.password)
        if(!chkPassword){
            return res.status(400).json({
                msg:"error",
                error:"Invalid Password"
            })
        }

        if(role != user.role){
            return res.status(400).json({
                msg:"error",
                error:"Invalid Crefentials"
            })
        }

        let token=await jwt.sign({userID:user._id,userEmail:user.email,userRole:role},process.env.HASHSECRET)

        return res.status(200).json({
            msg:"success",
            user:user,
            token:token
        })
        
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({
            msg:"Error",
            error:err.message
        })
    }
})


router.post('/signup',async(req,res)=>{
    try {
        const user=new User(req.body)
        await user.save()
        
        let token=await jwt.sign({userID:user._id,userEmail:user.email,userRole:user.role},process.env.HASHSECRET)

        return res.status(200).json({
            msg:"success",
            user:user,
            token:token
        })     
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({
            msg:"Error",
            error:err.message
        })
    }
})

router.get('/forgetPassword',async(req,res)=>{
    try {
        const email=req.query.email

        const user=await User.findOne({email:email})
        if(!user){
            return res.status(400).json({
                msg:"error",
                error:"User with this email does not exists."
            })
        }

        let newPass='123456'
        user.password=newPass
        await user.save()
        
        return res.status(200).json({
            msg:"success",
            password:newPass,
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