const { body, validationResult } = require('express-validator');

const validateCustomer = [
    body('name').notEmpty().withMessage("Enter Name"),
    body('password').notEmpty().withMessage("Enter Password"),
    body('email').isEmail().withMessage("Enter Email")
  ];

  const checkValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ errors: errorMessages }); 
    }
    next();
  };

  module.exports = {validateCustomer,checkValidation}
  