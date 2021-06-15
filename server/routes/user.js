const express=require('express')
const mongoose=require('mongoose')
const auth=require('../auth/index')
const router=new express.Router()


router.get('/',auth,async(req,res)=>{
    try {
        console.log(req.userID)
        console.log(req.userEmail)
        console.log(req.userRole)
        
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