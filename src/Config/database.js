const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const res = await mongoose.connect(process.env.BACKEND_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (res) {
      console.log("Database connection established");
    }
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = connectDatabase;
