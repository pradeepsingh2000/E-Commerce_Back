const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = require('../../Middelware/multer'); // Import the storage configuration
const CustomerController = require('../../Controller/customers/customerController');
const CustomerValidation = require('../../Validation/customerValidation');
const LoginValidation = require('../../Validation/loginValidation');
const upload = multer({ storage: storage });

router.use(express.json());

router.post('/login',LoginValidation.loginValidtor,LoginValidation.checkValidation,CustomerController.Customerlogin)
router.post('/register',upload.single('image'),CustomerValidation.validateCustomer,CustomerValidation.checkValidation,CustomerController.addCustomer);
router.post('/verifyOtp',CustomerController.verifyOtp);
router.post('/resendOtp',CustomerController.resendOtp);

router.post('/forgetPassword',() => {
    console.log('customer forget password');
});

module.exports = router;