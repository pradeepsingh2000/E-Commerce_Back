const AddToCart = require("../../Models/Addtocart/addtocart");
const Wishlist = require("../../Models/Wishlist/wishlist");
const messageConstant = require("../../Constants/MessageConstant");
const moment = require("moment");
const { success, fail } = require("../../Utils/sendResponse");
const Product = require("../../Models/Products/Product");
const ObjectId = require("mongoose").Types.ObjectId;
class WishListAndCartService {
  constructor() {}

  addCart = async (payload, user, res, next) => {
    console.log(payload,'the payload')
    const addToCart = await AddToCart.find({
      productId: payload.id,
      userId: user.id,
    });
    if (addToCart.length > 0) {
      return fail(res, 400, messageConstant.PRODUCT_ALREADY_EXIST, []);
    }
    const data = await AddToCart.create({
      userId: user.id,
      productId: payload.id, 
      totalPrice: payload.totalPrice 
    });
    return data;
  };


  getUserCart = async (payload, res, next) => {
    let query = [
      {
        $match: {
          isActive: true,
          userId: new ObjectId(payload.id),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
    ];
    const data = await AddToCart.aggregate(query);
    return data;
  };

  removeProductFromCart = async (id) => {
    console.log("Removing");
    const data = await AddToCart.findByIdAndDelete(id);
    return data;
  };

  addWishlist = async (payload, user, res, next) => {
    const addToWish = await Wishlist.find({
      userId: user.id,
      productId: payload.id,
    });
    if (addToWish.length > 0) {
      return fail(res, 400, messageConstant.WISHLIST_ALREADY_EXIST, []);
    }
    const data = await Wishlist.create({
      userId: user.id,
      productId: payload.id,
    });
    return data;
  };

  getUserWishList = async (payload, res, next) => {
    let query = [
      {
        $match: {
          isActive: true,
          userId: new ObjectId(payload.id),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
    ];
    const data = await Wishlist.aggregate(query);
    console.log(data);
    return data;
  };

  getProducts = async (req, res, next) => {
    const products = await Product.find({ isActive: true,isDelete: false})
    .populate( {
      path: 'reviews.user_id',
      select: 'name image', 
    })
    .exec();
  
    return products;
  };

  removeWishList = async (id, res, next) => {
    const data = await Wishlist.findByIdAndDelete(id);
    return data;
  };


  updateCartQuantity = async(payload,res,next) =>{
const data = await AddToCart.findByIdAndUpdate(payload.id,{totalPrice:payload.totalPrice, quantity:payload.quantity},{new:true})
return data;
  };
}

module.exports = new WishListAndCartService();
