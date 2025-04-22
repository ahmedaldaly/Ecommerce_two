const router = require('express').Router()
const {editOrder,removeOrder,getUserOrder,getAllOrder,addOrder} = require('../controller/orderController');
const {auth,authAndTrader,authAndAdmin,adminAndUser,adminAndTrader} = require('../middelware/authrazition')
router.route('/').post(addOrder).get(authAndAdmin,getAllOrder)
router.get('/order_user',auth,getUserOrder)
router.route('/:id').delete(adminAndUser,removeOrder).put(adminAndUser,editOrder)
module.exports = router;