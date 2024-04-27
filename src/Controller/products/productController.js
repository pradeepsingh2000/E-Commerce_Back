const trycathFn = require('../../Middelware/trycatch.js');
const productService = require('../../Services/product/productService.js');
const {success,fail} = require('../../Utils/sendResponse.js');
const messageConstant = require('../../Constants/MessageConstant.js');
const Product = require('../../Models/Products/Product.js');
const wishlist = require('../../Models/Wishlist/wishlist.js');
const addtocart = require('../../Models/Addtocart/addtocart.js');
const ObjectId = require("mongoose").Types.ObjectId;


const getProduct = trycathFn(async (req,res,next) => {
    const data = await productService.getProducts(req,res,next)
    if(data) success(res,200,messageConstant.SUCCESS,data);
    else fail(res,404,messageConstant.FAIL,[])
})

const updateProducts = trycathFn(async (req,res,next) => {
    const id = req.params.id;
    const isProduct = await Product.findById(id);
    if(isProduct) {
        const update = await productService.updateProduct(req,id,res,next);
        if(update) success(res,200,messageConstant.SUCCESS,update);
        else fail(res,400,messageConstant.FAIL,[])
    }
    else{
        fail(res,400,messageConstant.FAIL,[])
    } 
})

const deleteProduct = trycathFn(async (req, res, next) => {
    const id = req.params.id;
    const isProduct = await Product.findById(id);
    if(isProduct) {
        const isDelete = await Product.findByIdAndUpdate(id,{isActive:false},{new:true})
        if(isDelete) success(res,200,messageConstant.SUCCESS,[]);
        else fail(res,400,messageConstant.FAIL,[])
    }
    else{
        fail(res,400,messageConstant.FAIL,[])
    } 
}) 
const addReview = trycathFn(async (req,res,next) => {
    const id = req.params.id
    const isProduct = await productService.addReview(req.body,req.user,id);
    if(isProduct) success(res,200,messageConstant.SUCCESS,[]);
    else fail(res,400,messageConstant.FAIL,[])
});


const getTotalOfCartWish = trycathFn(async (req, res, next) => {
    const wishlistCount = await wishlist.countDocuments({ userId: new ObjectId(req.user.id) });
    const cartCount = await addtocart.countDocuments({ userId: new ObjectId(req.user.id) });
    
    const data = {
        wishlist: wishlistCount,
        cart: cartCount
    };
    
    success(res, 200, messageConstant.SUCCESS, data);
});





module.exports ={getProduct,updateProducts,deleteProduct,addReview,getTotalOfCartWish}