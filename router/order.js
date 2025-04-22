const router = require('express').Router()
const {editOrder,removeOrder,getUserOrder,getAllOrder,addOrder} = require('../controller/orderController');
const {auth,authAndTrader,authAndAdmin,adminAndUser,adminAndTrader} = require('../middelware/authrazition')
router.route('/').post(auth,addOrder).get(authAndAdmin,getAllOrder)
router.route('/:id').delete(adminAndUser,removeOrder).get(auth,getUserOrder).put(adminAndUser,editOrder)
module.exports = router;