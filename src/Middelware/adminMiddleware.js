const jwt = require("jsonwebtoken");
const { fail } = require("../Utils/sendResponse");
const adminToken = require("../Models/AdminToken/adminToken");

const verifyAdmin = (req, res, next) => {
  if(req.headers.authorization !== undefined || req.headers.Authorization !== undefined || req.header.Authorization !== null){
    const token = req.headers.authorization  || req.header.Authorization;
    if (!token) {
      fail(res,400,'Token not provided') 
    }
    jwt.verify(token, "secret",async   (err, decoded) => {
      if (err) {
        console.log(err)  
        fail(res,400,'Innvalid token',[])
      }else {
        console.log(decoded)
        const data = await adminToken.find({adminId:decoded.id, token :token})
        if(data.length) {
          req.user = data[0]; 
          next();
        }
      }
     
     
    });
  }
 
}

  module.exports =  {verifyAdmin}
