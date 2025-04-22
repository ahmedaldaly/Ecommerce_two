const router = require('express').Router();
const {addComment, getCommentProduct,deleteComment,editComment} = require('../controller/comment')
router.route('/').post(addComment)
router.route('/product').post(getCommentProduct)
router.route('/:id').put(editComment).delete(deleteComment)
module.exports =router;