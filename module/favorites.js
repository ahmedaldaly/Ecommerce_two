const mongoose = require('mongoose');
const favoritesSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    Product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },

},{timestamps:true});
const Favorite = mongoose.model('Favorite',favoritesSchema);
module.exports = Favorite;