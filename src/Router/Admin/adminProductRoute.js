const express = require('express');
const { AddProduct, GetProduct, EditProduct, DeleteProduct, GetProductById } = require('../../Controller/admin/adminProductController');
const router = express.Router();
const multer = require('multer');
const multerMiddleware = require('../../Middelware/productsMulter');
const AdminMiddleware = require('../../Middelware/adminMiddleware')
const storage = require('../../Middelware/multer');
const upload = multer({ storage: storage });


router.post('/addProduct',upload.single('images'),AddProduct);
router.put('/update/:id',upload.single('images'),EditProduct)
router.get('/getProduct',GetProduct);
router.put('/delete/:id',DeleteProduct);
router.get('/getProductById/:id',GetProductById)

module.exports = router