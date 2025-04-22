
const userRout = require('express').Router();
const {getAllUser,getUser,updateUser,deleteUser ,uploadImage} = require('../controller/userController')
const {auth,authAndTrader,authAndAdmin,adminAndUser} = require('../middelware/authrazition')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
userRout.route('/').get(authAndAdmin,getAllUser)
userRout.route('/:id').get(getUser).put(adminAndUser,updateUser).delete(adminAndUser,deleteUser)
userRout.route('/image/:id').put(adminAndUser,upload.single('image'),uploadImage)
module.exports =userRout