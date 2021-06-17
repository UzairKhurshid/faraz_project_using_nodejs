const express=require('express')
const mongoose=require('mongoose')
const auth=require('../auth/index')
const User=require('../models/user')
const Product=require('../models/products')
const Stock=require('../models/stock')
const History=require('../models/history')
const router=new express.Router()




module.exports=router