const router = require('express').Router()
const {addFavorite,getFavorite,deleteFavorite} = require('../controller/favoriteController');
router.route('/').post(addFavorite).get(getFavorite);
router.delete('/:id',deleteFavorite);
module.exports = router;