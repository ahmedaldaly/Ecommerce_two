const router = require('express').Router();
const multer = require ('multer')
const upload = multer({dest:'uploads/'})
const {addSubCategory,getSubCategory,editSubCategory,deleteSubCategory} = require('../controller/subCategoryController')
router.route('/').post(upload.single('image'),addSubCategory)
router.route('/:id').get(getSubCategory).put(upload.single('image'),editSubCategory).delete(deleteSubCategory)
module.exports = router;