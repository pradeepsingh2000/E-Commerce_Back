const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image : {
    type: String,
  },
  role :{
    type: String,
    default:"Admin"
  },
  

  
},{timestamps:true});


module.exports = mongoose.model('Admin', adminSchema);
