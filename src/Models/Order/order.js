const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'customer',
    },
    productIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
    }],
   status:{
    default:"confirmed",
    type:String,
   },
   isDeleived:{
    type:Boolean,
    default:false,
   },
   address:{
    type:String,
   },
   totalAmount:{
    type:Number,
    default:0
   }
  
  },
  {
    timestamps: true, 
  }
);

const Order = mongoose.model('Order', orderSchema);


module.exports = Order
