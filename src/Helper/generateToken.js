const jwt = require('jsonwebtoken');

const generateToken = async (payload, secret, expiresIn) => {
  try {
    const token = await new Promise((resolve, reject) => {
      jwt.sign(payload, secret, { expiresIn }, (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
    return token;
  } catch (error) {
    throw error;
  }
};

module.exports = generateToken;
