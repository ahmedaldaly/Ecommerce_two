const Category = require('../module/Category');
const asyncHandler = require('express-async-handler');
const cloudinary = require('../config/Cloud');
const fs = require('fs')
module.exports.getAllCategory = asyncHandler(async(req,res)=>{
    try{
        const category = await Category.find({parent:null});
        if (!category) res.status(404).json({message:"category not found"});
        res.status(200).json(category);
    }catch(err){res.status(500).json(err)}
})
module.exports.getSubCategory = asyncHandler(async(req,res)=>{
    try{
        const category = await Category.find({parent:req.params.id});
        if (!category) res.status(404).json({message:"category not found"});
        res.status(200).json(category);
    }catch(err){res.status(500).json(err)}
})
module.exports.getCategoryWithSubs = asyncHandler(async (req, res) => {
  try {
   
    const parentCategories = await Category.find({ parent: null });

    const result = await Promise.all(
      parentCategories.map(async (cat) => {
        const subcategories = await Category.find({ parent: cat._id });
        return {
          ...cat._doc,
          subcategories
        };
      })
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports.getCategory = asyncHandler(async(req,res)=>{
    try{
        const category = await Category.findById(req.params.id);
        if (!category) res.status(404).json({message:"category not found"});
        res.status(200).json(category);
    }catch(err){res.status(500).json(err)}
})
module.exports.deleteCategory = asyncHandler(async(req,res)=>{
    try{
        const category = await Category.findById(req.params.id);
        if (!category) res.status(404).json({message:"category not found"});
        const remove = await Category.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Category delete success"});
    }catch(err){res.status(500).json(err)}
})
module.exports.addCategory = asyncHandler(async (req, res) => {
  try {
    const find = await Category.findOne({ name: req.body.name });
    if (find) return res.status(400).json({ message: 'Category already exists' });

    if (!req.file) return res.status(404).json({ message: 'Image not found' });

    const result = await cloudinary.uploader.upload(req.file.path);

    const newCategory = new Category({
      name: req.body.name,
      image: {
        url: result.secure_url,
        id: result.public_id
      },
      parent: req.body.parent || null
    });

    await newCategory.save();
    fs.unlinkSync(req.file.path);

    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports.editCategory = asyncHandler(async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      let updatedImage = category.image; 
  
      if (req.file) {
   
        await cloudinary.uploader.destroy(category.image.id);
  
      
        const result = await cloudinary.uploader.upload(req.file.path);
        updatedImage = {
          url: result.secure_url,
          id: result.public_id
        };
  
        fs.unlinkSync(req.file.path); 
      }
  
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name || category.name,
          image: updatedImage,
          parent: req.body.parent !== undefined ? req.body.parent : category.parent
        },
        { new: true }
      );
  
      res.status(200).json(updatedCategory);
    } catch (err) {
        fs.unlinkSync(req.file.path); 
      res.status(500).json({ message: err.message });
    }
  });
  