const router = require('express').Router();
const multer = require ('multer');
const upload = multer ({dest:'uploads/'})
const {addProduct} = require('../controller/productController')
router.route('/').post(upload.array('image'),addProduct)
module.exports = router;