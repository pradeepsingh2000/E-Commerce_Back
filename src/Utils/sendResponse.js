

const success = (res, status, message, data = null) => {
  return res.status(status).json({

    status: true,
    message: message,
    data: data,
  });
};

const fail = (res, status, message, data = null) => {
  return res.status(status).json({
    status: false,
    message: message,
    data: data,
  });
};
  
  module.exports = { success, fail };
  