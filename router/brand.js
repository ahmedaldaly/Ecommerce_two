const router = require('express').Router();
const {addBrand, getAllBrand,getBrand, deleteBrand ,editBrand} = require('../controller/brandsController')
const multer = require ('multer')
const upload = multer ({dest:'uploads/'})
router.route('/').post(upload.single('image'),addBrand).get(getAllBrand)
router.route('/:id').get(getBrand).delete(deleteBrand).put(upload.single('image'),editBrand)
module.exports = router;