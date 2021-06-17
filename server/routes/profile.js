const express=require('express')
const mongoose=require('mongoose')
const auth=require('../auth/index')
const User=require('../models/user')
const router=new express.Router()


router.post('/updateProfile',auth,async(req,res)=>{
    try {
        let userID=req.userID
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


router.post('/updateProfileImage',auth,async(req,res)=>{
    try{
        let userID=req.userID
        let user=await User.findById({_id:mongoose.Types.ObjectId(userID)})
        if(!user){
            return res.status(400).json({
                msg:"error",
                error:"User not found"
            })
        }

        return res.status(200).json({
            msg:"Success"
        })
    }catch(err){
        console.log(err.message)
        return res.status(400).json({
            msg:"Error",
            error:err.message
        })
    }
})


module.exports=router