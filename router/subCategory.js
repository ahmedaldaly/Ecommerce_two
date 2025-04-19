const router = require('express').Router();
const multer = require ('multer')
const upload = multer({dest:'uploads/'})
const {addSubCategory} = require('../controller/subCategoryController')
router.route('/').post(upload.single('image'),addSubCategory)
module.exports = router;