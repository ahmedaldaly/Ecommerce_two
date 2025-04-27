const Brand = require('../module/Brands');
const asyncHandler = require('express-async-handler');
const cloudinary = require('../config/Cloud');
const fs = require('fs');
const Jwt = require('jsonwebtoken');
const Product = require ('../module/Product')
module.exports.addBrand = asyncHandler (async (req, res)=> {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded =  Jwt.verify(token ,process.env.JWT_SECRET)
         const find = await Brand.findOne({name: req.body.name});
         if (find)res.status(404).json({message:'brand already exists'});
         const result = await cloudinary.uploader.upload(req.file.path);
         const newBrand = new Brand ({
            name:req.body.name,
            user:decoded.id,
            descrition:req.body.descrition,
            image :{
                url:result.secure_url,
                id:result.public_id
            }
         })
         fs.unlinkSync(req.file.path);
         const save =await newBrand.save();
         res.status(201).json(save);
    }catch (err){
        fs.unlinkSync(req.file.path);
        res.status(500).json(err)
    }
})
module.exports.getAllBrand = asyncHandler (async(req, res)=>{
    try {
        const find = await Brand.find();
        if (!find) res.status(404).json({message:'brands not found'});
        res.status(200).json(find);
    }catch(err){res.status(500).json(err)}
})
module.exports.getBrand = asyncHandler (async(req, res)=>{
    try {
        const find = await Brand.findById(req.params.id);
        if (!find) res.status(404).json({message:'brand not found'});
        res.status(200).json(find);
    }catch(err){res.status(500).json(err)}
})
module.exports.getUserBrand = asyncHandler (async(req, res)=>{
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded =  Jwt.verify(token ,process.env.JWT_SECRET)
        const find = await Brand.findOne({user:decoded.id});
        if (!find) res.status(404).json({message:'brand not found'});
        res.status(200).json(find);
    }catch(err){res.status(500).json(err)}
})
module.exports.deleteBrand = asyncHandler(async (req, res) => {
    try {
        // 1. لاقي البراند
        const find = await Brand.findById(req.params.id);
        if (!find) return res.status(404).json({ message: 'Brand not found' });

        // 2. لاقي المنتجات اللي ليها نفس البراند
        const findProducts = await Product.find({ brand: find.name });

        // 3. امسح كل منتج مع صوره
        for (const product of findProducts) {
            // لو المنتج فيه صور
            if (product.image && product.image.length > 0) {
                for (const img of product.image) {
                    await cloudinary.uploader.destroy(img.id);
                }
            }
            // امسح المنتج نفسه
            await Product.findByIdAndDelete(product._id);
        }

        // 4. امسح صورة البراند
        if (find.image && find.image.id) {
            await cloudinary.uploader.destroy(find.image.id);
        }

        // 5. امسح البراند
        await Brand.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Brand and related products deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports.editBrand = asyncHandler (async(req, res)=>{
    try {
        const find = await Brand.findById(req.params.id);
        if (!find) res.status(404).json({message:'brand not found'});
       const result = find.image;
       if(req.file) {
        const remove = await cloudinary.uploader.destroy(result.id);
        const add = await cloudinary.uploader.upload(req.file.path);
        result.url = add.secure_url;
        result.id = add.public_id;
       }
        const edit = await Brand.findByIdAndUpdate(req.params.id,{
            name:req.body.name,
            descrition:req.body.descrition,
            image:{
                url:result.url,
                id:result.id
            }
        },{new:true});
        fs.unlinkSync(req.file.path);
        res.status(200).json(edit);
    }catch(err){
        fs.unlinkSync(req.file.path);
        res.status(500).json(err)
    }
})