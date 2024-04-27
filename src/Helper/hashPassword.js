
const bcrypt = require('bcrypt');

const  hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
}

const checkPassword = async (incomingPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(incomingPassword, hashedPassword);
    console.log(isMatch);
    return isMatch;
  } catch (error) {
    throw error;
  }
}

module.exports = { hashPassword ,checkPassword} ;
