const Customer = require("../../Models/Customer/Customer");
const {hashPassword,checkPassword} = require("../../Helper/hashPassword");
const generateToken = require("../../Helper/generateToken");
const generateOtp = require("../../Helper/generateOtp");
const moment = require("moment");
const { success, fail } = require("../../Utils/sendResponse");
const wishlist = require("../../Models/Wishlist/wishlist");
const addtocart = require("../../Models/Addtocart/addtocart");
const ObjectId = require("mongoose").Types.ObjectId;

class CustomerService {
  constructor() {}

  addCustomer = async (payload, image = null, res) => {
    const hash = await hashPassword(payload.password);
    const otp = await generateOtp();
    const otpExpire = moment().add(10, "minutes").unix();
    const customer = await Customer.create({
      name: payload.name,
      email: payload.email.toLowerCase().trim(),
      image: image?.path,
      password: hash,
      otp: otp.toString(),
      otpExpire: otpExpire,
    });
    return customer;
  };

  verifyUserOtp = async (payload, res, next) => {
    const { email, otp } = payload;
    console.log(payload);
    const user = await Customer.findOne({ email: email });
    console.log(user,'the user');
    if (user) {
      if (user.otp === otp.toString()) {
        const currentTimestamp = moment().unix();
        if (currentTimestamp < user.otpExpire) {
          const updateUser = await Customer.findByIdAndUpdate(
            { _id: user._id },
            { isVefied: true },
            { new: true }
          );
          success(res, 200, "otpVerified", updateUser);
        } else {
          fail(res, 400, "Otp Expire", []);
        }
      } else {
        fail(res, 404, "OTP is Not Same", []);
      }
    } else {
      fail(res, 404, "user not found", []);
    }
  };

  resendUserOpt = async(payload,res,next) => {
    const {email} = payload;
    console.log('hit');
    const user = await Customer.find({email: email});
    if(user) {
      const otp = await generateOtp();
      const otpExpire = moment().add(10, "minutes").unix();
      const data = await Customer.findByIdAndUpdate({_id:user[0]._id},{
        ot: otp,
        otpExpire: otpExpire
      },{new:true})
      return data;
    }
    else {
      fail(res,400,'User not found',[])
    }
  }

  login = async(payload,res,next) => {
    const user = await Customer.find({email:payload.email})
    if(user.length > 0) {
      const isPasswordMatch = await checkPassword(payload.password,user[0].password)
      if (isPasswordMatch) {
        const userPayload = {
          id:user[0]._id
        }
        const token = await generateToken(userPayload,process.env.SECRET_KEY,604800)
        const wishlistCount = await wishlist.countDocuments({ userId: new ObjectId(user[0]._id) });
        const cartCount = await addtocart.countDocuments({ userId: new ObjectId(user[0]._id) });
        
        let send ={
          role:user[0].role,
          token:token,
          wishlist:wishlistCount,
          cart:cartCount,
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
    return false;
  }

  forgetPassword = async (payload,res,next) => {

  }
}

module.exports = new CustomerService();
