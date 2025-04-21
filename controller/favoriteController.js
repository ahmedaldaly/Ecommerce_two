const Product = require('../module/Product');
const Favorite = require('../module/favorites');
const asyncHandler = require('express-async-handler');

module.exports.addFavorite = asyncHandler (async (req, res)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decoded = Jwt.verify(token ,process.env.JWT_SECRET)
        const find = await Favorite.findOne({user:decoded.id , Product:req.body.Product});
        if (find){
            res.status(400).json({message: 'product already exist'});
        }else{
            const newFavorite = new Favorite({
                user:decoded.id,
                Product:req.body.Product
            })
            const save = await newFavorite.save();
            res.status(201).json(save);
        }
    }catch(err){res.status(500).json(err)}
})
module.exports.getFavorite = asyncHandler (async (req, res)=>{
    const token = req.headers.authorization.split(' ')[1]
    const decoded = Jwt.verify(token ,process.env.JWT_SECRET)
    const  find = await Favorite.find({user:decoded.id});
    if(!find) res.status(404).json({message:'favorite not found'});
    const product = await Product.find({_id:find.Product});
    res.status(200).json(product);
});
module.exports.deleteFavorite = asyncHandler (async (req , res)=> {
    const find = await Favorite.findById(req.params.id);
    if (!find)res.status(404).json({message:'not found'});
    const remove = await Favorite.findByIdAndDelete(req.params.id);
    res.status(200).json({message:'success'})
})