// import customerauthService from '../Services/customer/customerauthService.js';
const customerauth = require('../../Services/customer/customerauthService.js');
const {success,fail} = require('../../Utils/sendResponse.js');
const trycathFn = require('../../Middelware/trycatch.js');
const EmailSender = require('../../EmailService/emailSender.js');
const customerauthService = require('../../Services/customer/customerauthService.js');

 const addCustomer = trycathFn(
    async (req,res,next) => {
       const customer = await customerauth.addCustomer(req.body, req.file, next);
        console.log(customer,'..');
       
       if(customer) {
            const send = await EmailSender.otpsend(customer.email,customer.otp)
            if(send) success(res,200,'Verify the OTP with Email',[]);
            else fail(res,400,'error to send email',[])
       }    
       else {
        fail(res, 400, 'Error', []);
       }
    }
);

const verifyOtp = trycathFn(
    async (req,res,next) => {
        const user =  await customerauthService.verifyUserOtp(req.body,res,next);
    }
)

const Customerlogin = trycathFn(async( req,res,next) => {
    const user = await customerauthService.login(req.body,res,next);
    if(user) {
        success(res,200,'Login successful',user)
    }
})

const resendOtp = trycathFn(
    async(req,res,next) => {
        const user = await customerauthService.resendUserOpt(req.body,res,next);
        if(user) {
            success(res,200,'We Resend Otp On User Email',[]);
        }
        else {
            fail(res,404,'User not found',[])
        }
    }
)
module.exports = {addCustomer , verifyOtp, resendOtp,Customerlogin}