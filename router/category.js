const router = require('express').Router();
const multer = require ('multer')
const {getAllCategory,getCategoryWithSubs,getCategory,addCategory,deleteCategory,editCategory ,getSubCategory} = require('../controller/categoryController')
const upload = multer({dest:'uploads/'})
router.route('/').get(getCategoryWithSubs).post(upload.single('image'),addCategory)
router.route('/:id').get(getCategory).delete(deleteCategory).put(upload.single('image'),editCategory)
router.route('/sub/:id').get(getSubCategory)
module.exports = router;