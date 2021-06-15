const express=require('express')
const mongoose=require('mongoose')
const router=new express.Router()


router.get('/',async(req,res)=>{
    try {
                
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({
            msg:"Error",
            error:err.message
        })
    }
})



module.exports=router