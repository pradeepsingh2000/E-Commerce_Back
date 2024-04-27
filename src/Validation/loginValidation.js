const { body, validationResult } = require('express-validator');


const loginValidtor =[
    body('email').isEmail().withMessage("Enter Email"),
    body('password').isString().withMessage("Enter Password")
]

const checkValidation = (req, res, next) => {
    console.log(req.file,">>");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ errors: errorMessages }); 
    }
    next();
  };

  module.exports = {loginValidtor,checkValidation}