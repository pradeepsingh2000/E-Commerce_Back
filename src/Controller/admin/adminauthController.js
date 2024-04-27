const trycatch = require("../../Middelware/trycatch");
const admin = require("../../Models/Admin/admin");
const AdminAuthService = require("../../Services/admin/adminAuthService");
const { fail, success } = require("../../Utils/sendResponse");
class AdminAuthController {
  constructor() {}

  AdminSingUp = trycatch(async (req, res, next) => {
    const register =await  AdminAuthService.addAdmin(req.body, req.file, next);
    if (register) {
      // const send = await EmailSender.otpsend(customer.email,customer.otp)
      success(res, 200, "Admin Register Succesful", []);
     
    } else {
      fail(res, 400, "Error", []);
    }
  });

  AdminLogin = trycatch(async (req,res,next) => {
    console.log("HIT ADMIN LOGIN")
    const login = await AdminAuthService.login(req.body,res,next)
    if(login){
        success(res, 200, "Admin Login Succesful",login);
    }
  })

  Profile = trycatch(async (req,res,next) =>{
    console.log(req.user)
const profile = await admin.findById(req.user.adminId)
success(res,200,'Success',profile)
  })
}

module.exports = new AdminAuthController();
