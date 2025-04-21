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
        const findCategory = await Category.find({name:req.body.category});
        const findBrand = await Brand.find({name:req.body.brand});
        const check = await Product.find({title:req.body.title , brand:req.body.brand})
        if (!findCategory || !findBrand|| check) {
            res.status(404).json({message:'category or brand not found'})
        }else{
            const images = [];
            for (const file of req.files) {
              const result = await cloudinary.uploader.upload(file.path);
              images.push({
                url: result.secure_url,
                id: result.public_id,
              });
            }
            const newProduct = new Product ({
                title:req.body.title,
                description:req.body.description,
                price:req.body.price,
                price:req.body.price,
                Category:req.body.Category,
                brand:req.body.brand,
                quantity:req.body.quantity,
                color:req.body.color,
                size:req.body.size,
                discount:req.body.discount,
                image: images,
            })
            
            const save = await newProduct.save();
            for (const file of req.files) {
               fs.unlinkSync(file.path)
              }
            res.status(201).json(save);
        }
    }catch(err){
        for (const file of req.files) {
            fs.unlinkSync(file.path)
           }
        res,status(500).json(err)}
});
module.exports.deleteProduct = asyncHandler (async (req, res)=>{
    try{
        const find = await Product.findById(req.params.id);
        if (!find)res.status(404).json({message:'product not found'});
        const image = find.image ;
        for (const img of image){
            const remove = await cloudinary.uploader.destroy(img.id);
        }
        const remove = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'product deleted success'})
    }catch(err){res.status(500).json(err)}
})