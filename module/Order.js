const mongoose = require ('mongoose');
const OrderSchema = new mongoose.Schema({
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
        address:{
            type:String,
            trim:true
        },
        amount:{
            type:Number,
            required:true,
            default:1,
        },
        status: {
            type: String,
            enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
            default: 'pending'
          },
          totalPrice: {
            type: Number,
            required: true
          }
          
},{timestamps:true});
const Order = mongoose.model('Order',OrderSchema);
module.exports = Order