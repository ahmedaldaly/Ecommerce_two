const Category = require('../module/Category');
const asyncHandler = require('express-async-handler');
const cloudinary = require('../config/Cloud');
const fs = require('fs')
module.exports.addSubCategory = asyncHandler (async (req,res) =>{
    try {
        const find = await Category.findOne ({name:req.body.parent})
        if (!find)res.status(404).json({message:"category not found"});
        const result =await cloudinary.uploader.upload(req.file.path);
        const addSubCategory = await Category.findByIdAndUpdate(find._id,{
            $push:{subCategory:{
                name:req.body.name,
                image:{
                    url:result.secure_url,
                    id:result.public_id
                }}
            }
        },{new:true})
         fs.unlinkSync(req.file.path);
        res.status(201).json(addSubCategory)
    }catch(err){
        fs.unlinkSync(req.file.path);
        res.status(500).json(err)
    }
}
);
