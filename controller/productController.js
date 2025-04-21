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
module.exports.getProduct = asyncHandler (async (req, res)=>{
    try{
        const find = await Product.findById(req.params.id);
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
module.exports.deleteProductImage = asyncHandler(async (req, res) => {
    try {
      const { productId, imageId } = req.body;
  
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      const imageToDelete = product.image.find(img => img.id === imageId);
      if (!imageToDelete) {
        return res.status(404).json({ message: 'Image not found in this product' });
      }
  
      
      await cloudinary.uploader.destroy(imageToDelete.id);
  
    
      await Product.findByIdAndUpdate(productId, {
        $pull: { image: { id: imageId } }
      });
  
      res.status(200).json({ message: 'Image deleted successfully' });
  
    } catch (err) {
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
      for (const file of req.files) {
        fs.unlinkSync(file.path)
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