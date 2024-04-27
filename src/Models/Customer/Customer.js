const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    default:'user',
  },
  email: {
    type: String,
    required: true,
  },
  image : {
    type: String,
  },
  password_reset_token: {
    type: String,
  },
  otpExpire: {
    type:Number,
  },
  otp: {
    type: String,
  },
  isVefied: {
    type:Boolean,
    default:false,
  }
  
});


module.exports = mongoose.model('customer', customerSchema);
