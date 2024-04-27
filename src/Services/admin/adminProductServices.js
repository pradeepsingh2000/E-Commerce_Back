const Products = require("../../Models/Products/Product");

const getAllProducts = async (payload) => {
  let { search, page, limit, category, brand } = payload;
  let option = {
    page: page ? page : 1,
    limit: limit ? limit : 10,
  };
  let query = { isDelete: false };

  if (search) {
    query.$or = [
      { name: { $regex: new RegExp(search, "i") } },
      { category: { $regex: new RegExp(search, "i") } },
      { brand: { $regex: new RegExp(search, "i") } },
    ];
  }
  // Apply category filter
  if (category) {
    query.category = category;
  }

  // Apply brand filter
  if (brand) {
    query.brand = brand;
  }

  const data = await Products.paginate(query, option);
  return data;
};

const deleteProducts = async (id) => {
  const data = await Products.findOneAndUpdate(
    { _id: id },
    { isDelete: true },
    { new: true }
  );
  return data;
};

const updateProducts = async (id, data) => {
  const info = await Products.findByIdAndUpdate({ _id: id }, data, {
    new: true,
  });
  return info;
};

const addProduct = async (payload) => {
  console.log(payload, "the product");
  const data = await Products.create(payload);
  return data;
};

module.exports = { addProduct, updateProducts, deleteProducts, getAllProducts };
