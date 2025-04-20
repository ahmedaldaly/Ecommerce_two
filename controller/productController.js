const Product = require('../module/Product');
const Category = require('../module/Category');
const Brand = require('../module/Brands');
const asyncHandler = require('express-async-handler');
const cloudinary = require('../config/Cloud');
module.exports.getAllProducts = asyncHandler (async (req, res)=>{
    try{
        const find = await Product.find();
        if (!find)res.status(404).json({message:"products not found"});
        res.status(200).json(find);
    }catch(err){res.status(500).json(err)}
})
module.exports.addProduct = asyncHandler (async (req, res)=>{
    try{
        
    }catch(err){res,status(500).json(err)}
})