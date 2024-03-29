const express=require('express')
const mongoose=require('mongoose')
const path=require('path')
const multer=require('multer')
const auth=require('../auth/index')
const Product=require('../models/products')
const router=new express.Router()

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../../public/images/productImages/'))
    },
    filename: function (req, file, cb) {
      cb(null, 'avatar'+req.params.id+file.fieldname + '-' + Date.now()+'.png')
    }
  })
   
  var upload = multer({ storage: storage })


router.get('/products',auth,async(req,res)=>{
    try {
        let products=await Product.find()
        
        return res.status(200).json({
            msg:"Success",
            products:products
        })
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({
            msg:"Error",
            error:err.message
        })
    }
})


router.get('/product/:id',auth,async(req,res)=>{
    try {
        let productID=req.params.id
        let product=await Product.findById({_id:mongoose.Types.ObjectId(productID)})
        if(!product){
            return res.status(400).json({
                msg:"error",
                error:"Product not found"
            })
        }

        return res.status(200).json({
            msg:"Success",
            product:product
        })
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({
            msg:"Error",
            error:err.message
        })
    }
})




router.post('/createProduct',auth,async(req,res)=>{
    try {
        let product=new Product(req.body)
        await product.save()

        return res.status(200).json({
            msg:"Success",
            product:product
        })
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({
            msg:"Error",
            error:err.message
        })
    }
})


router.post('/updateProduct',auth,async(req,res)=>{
    try {
        let productID=req.body.productID
        let product=await Product.findById({_id:mongoose.Types.ObjectId(productID)})
        if(!product){
            return res.status(400).json({
                msg:"error",
                error:"Product not found"
            })
        }

        if(req.body.name){
            product.name=req.body.name
        }
        if(req.body.key){
            product.key=req.body.key
        }
        if(req.body.purchaseUnitPrice){
            product.purchaseUnitPrice=req.body.purchaseUnitPrice
        }
        if(req.body.saleUnitPrice){
            product.saleUnitPrice=req.body.saleUnitPrice
        }

        await product.save()
        
        return res.status(200).json({
            msg:"Success",
            product:product
        })
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({
            msg:"Error",
            error:err.message
        })
    }
})

router.post('/updateProductImage/:id',upload.single('avatar'),auth,async(req,res)=>{
    try{
        let productID=req.params.id
        let product=await Product.findById({_id:mongoose.Types.ObjectId(productID)})
        if(!product){
            return res.status(400).json({
                msg:"error",
                error:'product not found'
            })
        }
        const file = req.file
        if (!file) {
            return res.status(400).json({
                msg:"error",
                error:"Profile Image not found"
            })
        }

        product.avatar=file.filename
        await product.save()

        return res.status(200).json({
            msg:"Success",
            product:product
        })
    }catch(err){
        console.log(err.message)
        return res.status(400).json({
            msg:"Error",
            error:err.message
        })
    }
})

router.get('/deleteProduct/:id',auth,async(req,res)=>{
    try {
        let productID=req.params.id
        let product=await Product.findByIdAndDelete({_id:mongoose.Types.ObjectId(productID)})
        
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