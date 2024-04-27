const {
  checkPassword,
  hashPassword,
} = require("../../Helper/hashPassword");
const Customer = require("../../Models/Customer/Customer");
const { fail } = require("../../Utils/sendResponse");

class CustomerAccountService {
  constructor() {}
  getProfile = async (payload, res, next) => {
    const data = await Customer.find({ _id: payload.id });
    if (!data) return false;
    else return data;
  };

  editProfile = async (user, payload, image = null, next) => {
    if (image) {
      payload.image = image.path;
    }
    const edit = await Customer.findByIdAndUpdate({ _id: user.id }, payload, {
      new: true,
    });
    return edit;
  };

  changePassword = async (payload, user, res, next) => {
    const userdata = await Customer.findById(user.id);
    const isPasswordMatch = await checkPassword(
      payload.password,
      user.password
    );
    if (!isPasswordMatch) {
      return false
    } else {
      const updatePassword = await hashPassword(payload.updatePassword);
      const ChangePass = await Customer.findByIdAndUpdate(
        { _id: user.id },
        {
          password: updatePassword,
        },
        { new: true }
      );
      return ChangePass;
    }
  };
}

module.exports = new CustomerAccountService();
