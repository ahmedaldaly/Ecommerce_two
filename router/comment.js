const router = require('express').Router();
const {addComment, getCommentProduct,deleteComment,editComment,getTopRatedProducts} = require('../controller/comment')
const {auth,authAndTrader,authAndAdmin,adminAndUser,adminAndTrader} = require('../middelware/authrazition')
router.route('/').post(auth,addComment)
router.route('/product/:id').get(getCommentProduct)
router.route('/best').get(getTopRatedProducts)
router.route('/:id').put(auth,editComment).delete(auth,deleteComment)
module.exports =router;