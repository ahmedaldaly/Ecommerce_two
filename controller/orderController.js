const Product = require('../module/Product');
const Order = require('../module/Order');
const asyncHandler = require('express-async-handler');

module.exports.addOrder = asyncHandler (async(req,res)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decoded = Jwt.verify(token ,process.env.JWT_SECRET)
        const find = await Order.findOne({user:decoded.id ,Product:req.body.Product})
        if (find){
            const plus = find.amount = find.amount +1;
            const update = await Order.findByIdAndUpdate(find._id,{
                amount:plus
            },{new:true})
            res.status(200).json(update)
        }else{
            const product = await Product.findById(req.body.product)
            const amount =req.body.amount || 1;
            const newOrder = new Order ({
                user:decoded.id,
                Product:req.body.Product,
                amount:amount,
                totalPrice :product.price * amount,
            })
            const order = await newOrder.save()
            res.status(201).json(order)
        }
    }catch(err){res.status(500).json(err)}
})
module.exports.getAllOrder = asyncHandler (async (req, res)=>{
    const find = await Order.find()
    if(!find)res.status(404).json({message:'orders not found'})
        res.status(200).json(find)
})
module.exports.getUserOrder = asyncHandler (async (req, res)=>{
    const token = req.headers.authorization.split(' ')[1]
    const decoded = Jwt.verify(token ,process.env.JWT_SECRET)
    const find = await Order.find({user:decoded.id})
    if(!find)res.status(404).json({message:'orders not found'})
        res.status(200).json(find)
})
module.exports.removeOrder = asyncHandler (async (req, res)=> {
    const find = await Order.findById(req.params.id);
    if(!find)res.status(404).json({message:'order not found'});
    const remove = await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({message:'order deleted success'})
})
module.exports.editOrder = asyncHandler (async (req, res)=>{
    const find = await Order.findById(req.params.id);
    if(!find)res.status(404).json({message:'order not found'});
    const update = await Order.findByIdAndUpdate(req.params.id ,{
        status:req.body.status,
        amount:req.body.amount
    },{new:true})
    res.status(200).json(update)
})