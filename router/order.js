const router = require('express').Router()
const {editOrder,removeOrder,getUserOrder,getAllOrder,addOrder} = require('../controller/orderController');
router.route('/').post(addOrder).get(getAllOrder)
router.route('/:id').delete(removeOrder).get(getUserOrder).put(editOrder)
module.exports = router;