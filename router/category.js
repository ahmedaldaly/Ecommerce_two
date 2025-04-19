const router = require('express').Router();
const multer = require ('multer')
const {getAllCategory,getCategory,addCategory,deleteCategory,editCategory} = require('../controller/categoryController')
const upload = multer({dest:'uploads/'})
router.route('/').get(getAllCategory).post(upload.single('image'),addCategory)
router.route('/:id').get(getCategory).delete(deleteCategory).put(upload.single('image'),editCategory)
module.exports = router;