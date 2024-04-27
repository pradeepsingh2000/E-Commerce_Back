const trycatch = require("../../Middelware/trycatch");
const customerAccountService = require("../../Services/customer/customerAccountService");
const { success, fail } = require("../../Utils/sendResponse");


const getProfile = trycatch(async(req,res,next)=>{
    const userInfo = await customerAccountService.getProfile(req.user,res,next);
    if(userInfo) {
        success(res,200,'Success',userInfo);
    }
    else {
        fail(res,403,'Failed to get profile')
    }
})
const editProfile = trycatch(async(req,res,next) =>{
    console.log(req.body,'th body')
const edit = await customerAccountService.editProfile(req.user,req.body,req.file,next);
console.log(edit);
if(edit)  success(res,200,'Success',edit);
else fail(res,400,'Failed to edit profile',[])
})

const changePassword = trycatch(async(req, res, next) =>{
    const changePassword = await customerAccountService.changePassword(req.body,req.user,res,next);
  if(changePassword)  success(res,200,'Password changed successfully',[]);
  else fail(res,400,'Passwords do not match',[]);
})

module.exports ={getProfile,editProfile,changePassword}