const router = require('express').Router();
const {addComment, getCommentProduct,deleteComment,editComment} = require('../controller/comment')
const {auth,authAndTrader,authAndAdmin,adminAndUser,adminAndTrader} = require('../middelware/authrazition')
router.route('/').post(auth,addComment)
router.route('/product').post(getCommentProduct)
router.route('/:id').put(auth,editComment).delete(auth,deleteComment)
module.exports =router;