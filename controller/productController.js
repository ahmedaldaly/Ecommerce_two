const Product = require('../module/Product');
const Category = require('../module/Category');
const Brand = require('../module/Brands');
const asyncHandler = require('express-async-handler');
const cloudinary = require('../config/Cloud');
const fs = require('fs')
module.exports.getAllProducts = asyncHandler (async (req, res)=>{
    try{
        const find = await Product.find();
        if (!find)res.status(404).json({message:"products not found"});
        res.status(200).json(find);
    }catch(err){res.status(500).json(err)}
})
module.exports.getProduct = asyncHandler (async (req, res)=>{
    try{
        const find = await Product.findById(req.params.id);
        if (!find)res.status(404).json({message:"products not found"});
        res.status(200).json(find);
    }catch(err){res.status(500).json(err)}
})
module.exports.addProduct = asyncHandler (async (req, res)=>{
    try{
        const findCategory = await Category.findOne({name:req.body.category});
        console.log(req.body.category)
        const findBrand = await Brand.findOne({name:req.body.brand});
        console.log(req.body.brand)
        const check = await Product.findOne({title:req.body.title , brand:req.body.brand})
        if (!findCategory ) {
          for (const file of req.files) {
            fs.unlinkSync(file.path)
           }
            res.status(404).json({message:'category  not found'})
        }else if(!findBrand){
          for (const file of req.files) {
            fs.unlinkSync(file.path)
           }
          res.status(404).json({message:'  brand not found'})
        }else if (check){
          for (const file of req.files) {
            fs.unlinkSync(file.path)
           }
          res.status(404).json({message:' Product already exist'})
        }
        else{
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
                category:findCategory.name,
                brand:findBrand.name,
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
module.exports.deleteProductImage = asyncHandler(async (req, res) => {
  try {
    const { productId, imageId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const imageIndex = product.image.findIndex(img => img.id === imageId);
    if (imageIndex === -1) {
      return res.status(404).json({ message: 'Image not found in this product' });
    }

    const imageToDelete = product.image[imageIndex];

    // حذف الصورة من Cloudinary
    await cloudinary.uploader.destroy(imageToDelete.id);

    // حذف الصورة من المصفوفة
    product.image.splice(imageIndex, 1);

    // حذف اللون المقابل
    if (product.color?.[0]) {
      let parsedColors = product.color[0].split(',');
      parsedColors.splice(imageIndex, 1);
      product.color[0] = parsedColors.join(',');
    }

    await product.save();

    res.status(200).json({ message: 'Image and corresponding color deleted successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err });
  }
});

  module.exports.editProduct = asyncHandler(async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      let newImages = [];
  
    
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const result = await cloudinary.uploader.upload(file.path);
          newImages.push({
            url: result.secure_url,
            id: result.public_id,
          });
        }
      }
  
  
      const allImages = [...product.image, ...newImages];
  
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          Category: req.body.Category,
          brand: req.body.brand,
          quantity: req.body.quantity,
          color: req.body.color,
          discount: req.body.discount,
          image: allImages,
        },
        { new: true }
      );
      if (req.files){
        for (const file of req.files) {
          fs.unlinkSync(file.path)
        }
      }
      res.status(200).json(updatedProduct);
    } catch (err) {
        for (const file of req.files) {
            fs.unlinkSync(file.path)
          }
      res.status(500).json({ message: 'Server error', error: err });
    }
  });
  module.exports.getProductByCategory = asyncHandler(async (req, res) => {
    const category = req.query.category;
  
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }
  
    const products = await Product.find({ Category: category });
  
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found for this category" });
    }
  
    res.status(200).json(products);
  });
  module.exports.getProductByBrand = asyncHandler(async (req, res) => {
    const brand = req.query.brand;
  
    if (!brand) {
      return res.status(400).json({ message: "brand is required" });
    }
  
    const products = await Product.find({ brand: brand });
  
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found for this brand" });
    }
  
    res.status(200).json(products);
  });