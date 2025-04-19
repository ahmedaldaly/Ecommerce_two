
const router = require('express').Router();
const {register,Login,googleAuth,googleCallback}  = require('../controller/authController')
router.post('/register',register)
router.post('/login',Login)
router.get("/google", googleAuth);
router.get("/google/callback", googleCallback);
module.exports =router