const router = require('express').Router()
const {addFavorite,getFavorite,deleteFavorite} = require('../controller/favoriteController');
const {auth,authAndTrader,authAndAdmin,adminAndUser,adminAndTrader} = require('../middelware/authrazition')
router.route('/').post(auth,addFavorite).get(auth,getFavorite);
router.delete('/:id',auth,deleteFavorite);
module.exports = router;