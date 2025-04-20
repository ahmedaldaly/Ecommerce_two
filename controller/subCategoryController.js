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
module.exports.getSubCategory = asyncHandler(async(req,res)=>{
    try{
        const category = await Category.findById (req.params.id);
        if (!category) res.status(404).json({message:'category not found'});
        const subCategory = category.subCategory;
        res.status(200).json(subCategory)
    }catch(err){res.status(500).json(err)}
})
module.exports.editSubCategory = asyncHandler(async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'category not found' });

        const subCategory = category.subCategory.id(req.body.id);
        if (!subCategory) return res.status(404).json({ message: 'SubCategory not found' });

        let result;
        if (req.file) {
            await cloudinary.uploader.destroy(subCategory.image.id); 
            result = await cloudinary.uploader.upload(req.file.path); 
            subCategory.image.url = result.secure_url;
            subCategory.image.id = result.public_id;
            fs.unlinkSync(req.file.path); 
        }

        subCategory.name = req.body.name;
        await category.save();

        res.status(200).json(subCategory);
    } catch (err) {
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path); 
        }
        res.status(500).json(err);
    }
});

module.exports.deleteSubCategory = asyncHandler(async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        const subCategory = category.subCategory.id(req.body.id);
        if (!subCategory) return res.status(404).json({ message: 'SubCategory not found' });

        await cloudinary.uploader.destroy(subCategory.image.id); 
        
        category.subCategory.pull(subCategory._id); // حذف العنصر من المصفوفة
        await category.save(); // حفظ التغييرات في الـ database

        res.status(200).json({ message: "SubCategory deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});

