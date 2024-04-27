const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/'); 
    },
    filename: (req, file, cb) => {
        console.log(file,">>")
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext); 
    },
  });

  
module.exports = storage;