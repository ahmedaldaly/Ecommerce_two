
const userRout = require('express').Router();
const {getAllUser,getUser,updateUser,deleteUser ,uploadImage} = require('../controller/userController')
const {auth,authAndTrader,authAndAdmin} = require('../middelware/authrazition')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
userRout.route('/').get(getAllUser)
userRout.route('/:id').get(getUser).put(updateUser).delete(deleteUser)
userRout.route('/image/:id').put(upload.single('image'),uploadImage)
module.exports =userRout