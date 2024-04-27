const mongoose = require('mongoose');

const admintokentSchema = new mongoose.Schema({
  adminId :{
    type:mongoose.Schema.Types.ObjectId,
    ref:'admin'
  } ,

token :{
    type:String,
    default:null
}
  
});


module.exports = mongoose.model('AdminToken', admintokentSchema);
