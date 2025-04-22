const asyncHandler = require('express-async-handler');
const rateing = require('../module/rateing');
const Jwt = require('jsonwebtoken');

module.exports.addRateing = asyncHandler(async(req , res)=>{
try{
    const token = req.headers.authorization.split(' ')[1]
    const decoded =  Jwt.verify(token ,process.env.JWT_SECRET)
    const newRateing = new rateing({
        user:decoded.id,
        product:req.body.product,
        rateing:req.body.rateing
    })
    const save = await newRateing.save()
    res.status(201).json(save)
}catch(err){res.status(500).json(err)}
})
module.exports.getRateingProduct = asyncHandler(async(req , res)=>{
    try{
        const find = await rateing.find({product:req.body.product})
        if (!find)res.status(404).json({message:'rateing not found'})
            res.status(200).json(find)
    }catch(err){res.status(500).json(err)}
})
module.exports.deleteRateing =asyncHandler(async(req, res)=>{
    try{
        const find = await rateing.findById(req.params.id);
        if(!find)res.status(404).json({message:'rateing not found'});
        const remove = await rateing.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'rateing deleted success'})
    }catch(error){res.status(500).json(error)}
});
