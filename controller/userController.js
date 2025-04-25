const  User  = require('../module/User');
const asyncHandler = require('express-async-handler');
const cloudinary = require('../config/Cloud');
const fs = require('fs')
const Jwt = require('jsonwebtoken')
module.exports.getAllUser = asyncHandler(async(req,res)=>{
    try{
        const user =await User.find().select('-password')
        if(!user)res.status(404).json({message:'user not found'})
            res.status(200).json(user)
    }catch(err){res.status(500).json(err)}
})
module.exports.getUser = asyncHandler(async(req,res)=>{
    try{
        const user =await User.findById(req.params.id).select('-password')
        if(!user)res.status(404).json({message:'user not found'})
            res.status(200).json(user)
    }catch(err){res.status(500).json(err)}
})
module.exports.updateUser = asyncHandler(async(req,res)=>{
    try{
        const user =await User.findById(req.params.id).select('-password')
        if(!user)res.status(404).json({message:'user not found'})
            const edit = await User.findByIdAndUpdate(req.params.id ,{
        isAdmin:req.body.isAdmin,
        name:req.body.name,
        address:req.body.address,
        phone:req.body.phone,
        isTrader:req.body.isTrader,
            },{new:true})
            res.status(200).json(edit)
    }catch(err){res.status(500).json(err)}
})
module.exports.deleteUser = asyncHandler(async(req,res)=>{
    try{
        const user =await User.findById(req.params.id).select('-password')
        if(!user)res.status(404).json({message:'user not found'})
          const deleteUser = await User.findByIdAndDelete(req.params.id)
            res.status(200).json({message:'user deleted'})
    }catch(err){res.status(500).json(err)}
})



module.exports.uploadImage = asyncHandler(async (req, res) => {
    try {
      if (!req.file) return res.status(404).json({ message: 'Image not found' });
  
     
  
      const result = await cloudinary.uploader.upload(req.file.path);
  
      const user = await User.findById(req.params.id).select('-password');
      if (!user) return res.status(404).json({ message: 'User not found' });
      const deleteimage = await cloudinary.uploader.destroy(user.image.id)
      const update = await User.findByIdAndUpdate(
        req.params.id,
        {
          image: {
            url: result.secure_url,
            id: result.public_id
          }
        },
        { new: true }
      );
    await fs.unlinkSync(req.file.path)
      res.status(201).json(update);
    } catch (err) {
      console.error("🔥 Upload Image Error:", err);
       fs.unlinkSync(req.file.path)
      res.status(500).json({ message: 'Upload failed', error: err });
    }
  });
  module.exports.getUserByToken = asyncHandler(async(req, res)=>{
    try{
      const token = req.headers.authorization.split(' ')[1];
      const decoded = Jwt.verify(token ,process.env.JWT_SECRET)
      const user = await User.findById(decoded.id).select('-password')
      if(!find)res.status(404).json({message:'user not found'})
        res.status(200).json(user)
    }catch(err){res.status(500).json(err)}
  })