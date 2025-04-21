const router = require('express').Router();
const multer = require ('multer');
const upload = multer ({dest:'uploads/'})
const {addProduct,getAllProducts,deleteProduct,getProduct ,deleteProductImage,editProduct} = require('../controller/productController')
router.route('/').post(upload.array('image'),addProduct).get(getAllProducts).delete(deleteProductImage)
router.route('/:id').delete(deleteProduct).get(getProduct).put(upload.array('image'),editProduct)
module.exports = router;