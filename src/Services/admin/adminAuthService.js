const generateToken = require("../../Helper/generateToken");
const { hashPassword, checkPassword } = require("../../Helper/hashPassword");
const admin = require("../../Models/Admin/admin")
const { fail, success } = require("../../Utils/sendResponse");
const adminToken = require("../../Models/AdminToken/adminToken")

class AdminAuthService {
    constructor () {}

    addAdmin = async (payload, image = null, res) => {
        const hash = await hashPassword(payload.password);
        const customer = await admin.create({
          name: payload.name,
          email: payload.email.toLowerCase().trim(),
          image: image?.path,
          password: hash,
        });
        return customer;
      };
    login = async(payload,res,next) => {
        const user = await admin.find({email:payload.email})
        if(user.length > 0) {
          const isPasswordMatch = await checkPassword(payload.password,user[0].password)
          if (isPasswordMatch) {
            const userPayload = {
              id:user[0]._id
            }
            const token = await generateToken(userPayload,'secret',604800)
            const settoken = await adminToken.create({
                adminId:user[0]._id,
                token:token
            })
           
            let send ={
              role:user[0].role,
              token:token,
             
            }
            return send;
          }
          else {
            fail(res,400,'Password or email are not same',[])
          }
        }
        else {
          fail(res,400,'User not found',[]);
        }
        // return false;
      }
}

module.exports = new AdminAuthService()