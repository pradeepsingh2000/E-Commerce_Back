const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = require('../../Middelware/multer');
const upload = multer({ storage: storage });

const CustomerMiddleware = require('../../Middelware/customerMiddleware')
const CustomerAccountController = require('../../Controller/customers/customerProfileController')
router.get('/profile',CustomerMiddleware.verifyUser,CustomerAccountController.getProfile);
router.put('/editProfile',upload.single('image'),CustomerMiddleware.verifyUser,CustomerAccountController.editProfile);
router.put('/changePassword',CustomerMiddleware.verifyUser,CustomerAccountController.changePassword)



module.exports = router;