const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  image: {
    url: {
      type: String,
      trim: true,
      required: true
    },
    id: {
      type: String,
      trim: true,
      required: true
    }
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null // لو null يبقى هو كاتيجوري رئيسي
  }
}, {
  timestamps: true
});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
