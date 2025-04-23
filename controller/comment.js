const asyncHandler = require('express-async-handler');
const comment = require('../module/comment');
const Jwt = require('jsonwebtoken');
const  User  = require('../module/User');
module.exports.addComment = asyncHandler(async(req , res)=>{
try{
    const token = req.headers.authorization.split(' ')[1]
    const decoded =  Jwt.verify(token ,process.env.JWT_SECRET)
    const newComment = new comment({
        user:decoded.id,
        product:req.body.product,
        comment:req.body.comment,
        rateing:req.body.rateing
    })
    const save = await newComment.save()
    res.status(201).json(save)
}catch(err){res.status(500).json(err)}
})
module.exports.getCommentProduct = asyncHandler(async (req, res) => {
    try {
      const find = await comment.find({ product: req.params.id });
  
      if (!find || find.length === 0) {
        return res.status(404).json({ message: 'comment not found' });
      }
  
      const users = await Promise.all(find.map(c => User.findById(c.user)));
  
      const formattedComments = find.map((c, index) => ({
        _id: c._id,
        comment: c.comment,
        rateing: c.rateing,
        name: users[index]?.name,
        image: users[index]?.image
      }));
  
      res.status(200).json(formattedComments);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
module.exports.deleteComment =asyncHandler(async(req, res)=>{
    try{
        const find = await comment.findById(req.params.id);
        if(!find)res.status(404).json({message:'comment not found'});
        const remove = await comment.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'comment deleted success'})
    }catch(error){res.status(500).json(error)}
});
module.exports.editComment = asyncHandler(async(req, res)=>{
    try{
          const find = await comment.findById(req.params.id);
        if(!find)res.status(404).json({message:'comment not found'});
        const edit = await comment.findByIdAndUpdate(req.params.id,{
            comment:req.body.comment,
            rateing:req.body.rateing
        },{new:true})
        res.status(200).json(edit)
    }catch(error){
        res.status(500).json(error)
    }
})