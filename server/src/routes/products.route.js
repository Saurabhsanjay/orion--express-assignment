const express= require('express');
const router=express.Router()
const productController=require('../controllers/products.controller')

//router to get all the products
router.get('/products',productController.getAllProducts)


module.exports=router