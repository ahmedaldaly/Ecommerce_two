const router = require('express').Router();
const multer = require ('multer')
const {getAllCategory,getCategoryWithSubs,getCategory,addCategory,deleteCategory,editCategory ,getSubCategory,getAllCategorAndSub} = require('../controller/categoryController')
const upload = multer({dest:'uploads/'})
const {auth,authAndTrader,authAndAdmin,adminAndUser,adminAndTrader} = require('../middelware/authrazition')
router.route('/').get(getCategoryWithSubs).post(authAndTrader,upload.single('image'),addCategory)
router.route('/all').get(getAllCategorAndSub)
router.route('/:id').get(getCategory).delete(authAndAdmin,deleteCategory).put(authAndAdmin,upload.single('image'),editCategory)
router.route('/sub/:id').get(getSubCategory)
module.exports = router;