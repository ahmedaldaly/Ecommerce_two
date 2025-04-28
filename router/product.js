const router = require('express').Router();
const multer = require ('multer');
const upload = multer ({dest:'uploads/'})
const {auth,authAndTrader,authAndAdmin,adminAndUser,adminAndTrader} = require('../middelware/authrazition')
const {addProduct,getAllProducts,deleteProduct,getProduct,getProductByBrand ,deleteProductImage,editProduct,getProductByCategory} = require('../controller/productController')
router.route('/').post(adminAndTrader,upload.array('image'),addProduct).get(getAllProducts).delete(authAndAdmin,deleteProductImage)
router.route('/by').get(getProductByCategory)
router.route('/by_brand').get(getProductByBrand)
router.route('/:id').delete(authAndAdmin,deleteProduct).get(getProduct).put(authAndAdmin,upload.array('image'),editProduct)
module.exports = router;