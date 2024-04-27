const mongoose = require('mongoose');

const addtocartSchema = new mongoose.Schema({
  userId :{
    type:mongoose.Schema.Types.ObjectId,
    ref:'customer'
  },

productId: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'product'
  },
  quantity :{
    type:Number,
    default:1
  },
  totalPrice :{
    type:Number
  },
  isActive: {
    type: Boolean,
    default: true,
  }
  
});


module.exports = mongoose.model('AddToCart', addtocartSchema);
