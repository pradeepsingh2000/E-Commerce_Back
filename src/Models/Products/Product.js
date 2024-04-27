const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  images: 
    {
      type: String,
    },

  description: {
    type: String,
  },
  totalrating: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      comment: String,
      rating: Number,
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer",
      },
    },
  ],
  quantity: {
    type: Number,
    required: true,
  },
  isOutOfStock: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,

  },
  brand: {
    type: String,
    required: true,
  },
  isDelete:{
type:Boolean,
default: false,
  },
},{timestamps:true});
productsSchema.plugin(mongoosePaginate);

const Products = mongoose.model("products", productsSchema);
module.exports = Products;