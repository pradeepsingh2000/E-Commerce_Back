const express = require('express');
const router = express.Router();
const AdminSchema = require('../../Validation/adminValidation')
const AdminMiddleware = require('../../Middelware/adminMiddleware')

const Validator = require('../../Utils/validator')
const AdminAuthController = require('../../Controller/admin/adminauthController')
router.post('/login',Validator(AdminSchema.AdminLoginSchema),AdminAuthController.AdminLogin)

router.post('/register',Validator(AdminSchema.AdminSingUpschema),AdminAuthController.AdminSingUp)

router.get('/profile',AdminMiddleware.verifyAdmin,AdminAuthController.Profile)

router.post('/forgetPassword',() => {
    console.log('admin forget password');
});

module.exports = router;