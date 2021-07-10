const express=require('express')
const mongoose=require('mongoose')
const path=require('path')
const multer=require('multer')
const auth=require('../auth/index')
const User=require('../models/user')
const router=new express.Router()

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../../public/images/userProfileImages/'))
    },
    filename: function (req, file, cb) {
      cb(null, 'avatar'+file.originalname + '-' + Date.now()+'.png')
    }
  })
   
  var upload = multer({ storage: storage })

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


router.post('/updateProfileImage',upload.single('avatar'),auth,async(req,res)=>{
    try{
        let userID=req.userID
        let user=await User.findById({_id:mongoose.Types.ObjectId(userID)})
        if(!user){
            return res.status(400).json({
                msg:"error",
                error:"User not found"
            })
        }
        const file = req.file
        if (!file) {
            return res.status(400).json({
                msg:"error",
                error:"Profile Image not found"
            })
        }

        user.avatar=file.filename
        await user.save()

        return res.status(200).json({
            msg:"Success",
            user:user
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