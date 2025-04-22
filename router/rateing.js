const router = require('express').Router();
const { addRateing,getRateingProduct,deleteRateing} = require('../controller/rateingController')
const {auth,authAndTrader,authAndAdmin,adminAndUser,adminAndTrader} = require('../middelware/authrazition')
router.route('/').post(auth,addRateing)
router.route('/product').post(getRateingProduct)
router.route('/:id').delete(auth,deleteRateing)
module.exports =router;