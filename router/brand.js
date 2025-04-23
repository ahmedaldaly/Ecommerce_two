const router = require('express').Router();
const {addBrand, getAllBrand,getBrand, deleteBrand ,editBrand,getUserBrand} = require('../controller/brandsController')
const multer = require ('multer')
const upload = multer ({dest:'uploads/'})
const {auth,authAndTrader,authAndAdmin,adminAndUser,adminAndTrader} = require('../middelware/authrazition')
router.route('/').post(adminAndTrader,upload.single('image'),addBrand).get(getAllBrand)
router.route('/user').get(auth,getUserBrand)
router.route('/:id').get(getBrand).delete(authAndAdmin,deleteBrand).put(authAndAdmin,upload.single('image'),editBrand)
module.exports = router;