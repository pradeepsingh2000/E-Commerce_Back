  const mongoose = require('mongoose');

  const wishlistSchema = new mongoose.Schema({
    userId :{
      type:mongoose.Schema.Types.ObjectId,
      ref:'customer'
    } ,

  productId: {
      type:mongoose.Schema.Types.ObjectId,
      ref:'product'
    },
    isRemove :{
      type:Boolean,
      default:true,
    },
    isActive: {
      type: Boolean,
      default: true,
    }
    
  });


  module.exports = mongoose.model('wishlist', wishlistSchema);
