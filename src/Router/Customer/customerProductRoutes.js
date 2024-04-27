const express = require('express');
const router = express.Router();
const app = express()
const bodyParser = require('body-parser'); // Import body-parser



const CustomerMiddleware = require('../../Middelware/customerMiddleware')
const {Payment} = require('../../Controller/order/orderController')
ProductController = require('../../Controller/products/productController')
const CustomerCartController = require("../../Controller/addtocart&wishlist/addtocartController");
router.post('/addToCart',CustomerMiddleware.verifyUser,CustomerCartController.addCartData);
router.delete('/removeToCart/:id',CustomerMiddleware.verifyUser,CustomerCartController.removeCartData);
router.get('/getCartData',CustomerMiddleware.verifyUser,CustomerCartController.getCartData);
router.post('/addToWishlist/:id',CustomerMiddleware.verifyUser,CustomerCartController.addWishData);
router.delete('/removeToWish/:id',CustomerMiddleware.verifyUser,CustomerCartController.removeWishData);
router.get('/getWishlist',CustomerMiddleware.verifyUser,CustomerCartController.getWishData);
router.get('/getProductById/:id',CustomerCartController.getProductById);
router.get('/getAllProducts',CustomerCartController.getAllProducts);
// router.post('/addReview/:id',CustomerMiddleware.verifyUser,ProductController.addReview);
router.get('/getCartWish',CustomerMiddleware.verifyUser,ProductController.getTotalOfCartWish);
router.post('/updateCartQuantity',CustomerMiddleware.verifyUser,CustomerCartController.updateCartQuantity)
router.post('/createOrder',CustomerMiddleware.verifyUser,Payment)

module.exports = router;