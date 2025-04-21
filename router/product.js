const router = require('express').Router();
const multer = require ('multer');
const upload = multer ({dest:'uploads/'})
const {addProduct,getAllProducts,deleteProduct} = require('../controller/productController')
router.route('/').post(upload.array('image'),addProduct).get(getAllProducts)
router.route('/:id').delete(deleteProduct)
module.exports = router;