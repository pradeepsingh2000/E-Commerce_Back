
const trycatch = require('../../Middelware/trycatch.js');
const category = require('../../Models/ProductCategory/category');
const { success, fail } = require('../../Utils/sendResponse.js');
const messageConstant = require('../../Constants/MessageConstant.js')
const wish_cart = require('../../Services/customer/wishlist&cartService.js'); 
const Product = require('../../Models/Products/Product.js');
const addtocart = require('../../Models/Addtocart/addtocart.js');
const wishlist = require('../../Models/Wishlist/wishlist.js');
const ObjectId = require("mongoose").Types.ObjectId;


const addCartData = trycatch(async (req,res,next) =>  {
    const data = await wish_cart.addCart(req.body,req.user,res,next);
    if(data) success(res,200,messageConstant.ADD_TO_CART_SUCCESS,data);
    else  fail(res,400,messageConstant.ERROR,[])
})

const getCartData = trycatch(async (req,res,next) => {
    const id = req.params.id;
    const data = await wish_cart.getUserCart(req.user,res,next);
    if(data) success(res,200,messageConstant.SUCCESS,[data])
    else  fail(res,400,messageConstant.FAIL,[])
})

const removeCartData = trycatch(async (req,res,next) => {
    const id = req.params.id
    const data = await wish_cart.removeProductFromCart(id)
    if(data) success(res,200,messageConstant.REMOVE_TO_CART_SUCCESS,[])
    else  fail(res,400,messageConstant.FAIL,[])
})

const updateQuantity = trycatch(async(req,res,next) =>{
    const id = req.params.id
    const data = await addtocart.findByIdAndUpdate(id,{quantity:req.body.quantity},{new:true})
    if(data) success(res,200,messageConstant.SUCCESS,[])
})


const addWishData = trycatch(async (req,res,next) =>  {
    const id = req.params.id
    const data = await wish_cart.addWishlist(req.params,req.user,res,next);
    if(data) success(res,200,messageConstant.WISHLIST_TO_CART_SUCCESS,data);
    else  fail(res,400,messageConstant.ERROR,[])
})

const getWishData = trycatch(async (req,res,next) => {
    const data = await wish_cart.getUserWishList(req.user,res,next);
    if(data) success(res,200,messageConstant.SUCCESS,data)
    else  fail(res,400,messageConstant.FAIL,[])
})

const removeWishData = trycatch(async (req,res,next) => {
    const id = req.params.id
    const data = await wish_cart.removeWishList(id)
    if(data) success(res,200,messageConstant.REMOVE_TO_CART_SUCCESS,[])
    else  fail(res,400,messageConstant.FAIL,[])
})

const getProductById = trycatch(async (req,res,next) =>{
    const id = req.params.id
    const data = await Product.findById(id).populate( {
        path: 'reviews.user_id',
        select: 'name image', 
      });
    success(res,200,messageConstant.SUCCESS,data);
})

const getAllProducts = trycatch(async (req,res,next) => {
    const data  = await wish_cart.getProducts();
    if(data) success(res,200,messageConstant.SUCCESS,data);
})
const updateCartQuantity = trycatch(async (req,res,next) =>{
    const data = await wish_cart.updateCartQuantity(req.body,res,next)
    if(data) success(res,200,messageConstant.SUCCESS,data);
    else success(res,404,messageConstant.FAIL,[]);
});



module.exports = {addCartData,getCartData,removeCartData,addWishData,getWishData,removeWishData,getProductById,getAllProducts,updateCartQuantity}