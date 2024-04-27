const jwt = require("jsonwebtoken");
const {success,fail} = require('../Utils/sendResponse');
const Customer = require("../Models/Customer/Customer");
const verifyUser =  (req, res, next) => {
  if(req.headers.authorization !== undefined || req.headers.Authorization !== undefined || req.header.Authorization !== null){
    const token = req.headers.authorization  || req.header.Authorization;
    console.log(req.headers.Authorization,'the authorization')
console.log(token,'in require')
    if (!token) {
      fail(res,400,'Token not provided') 
    }
  jwt.verify(token,"secret", async (err, decoded) => {
      if (err) {
        console.log(err)
        fail(res,400,'Innvalid token',[])
      }
      console.log(decoded)
      const data = await Customer.find({_id:decoded.id})
      req.user = data[0]; 
      next();
    });
  
  } 
  else{
    fail(res,400,'Provide token',[])
  }
 };


module.exports =  {verifyUser}
