const Product = require("../../Models/Products/Product");

class ProductService {
  constructor() {}
  addProduct = async (payload, req, res, next) => {
    const imagePaths = await req.files.map((file) => file.path);
    const product = await Product.create({
      name: payload.name,
      images: imagePaths,
      description: payload.description,
      quantity: payload.quantity,
      price: payload.price,
      category_id: payload.category_id,
      brand: payload.brand,
    });

    if (product) return product;
    else return false;
  };
  getProducts = async (req, res, next) => {
    const options = {
      page: 1,
      limit: 10,
    }
 const data = await Product.paginate({}, options);
    
//  await Product.populate(data.docs, { path: 'category_id' ,select: 'name '});


    return data
  };

  updateProduct = async (payload, id, res, next) => {
    const update = {};
    if (payload.files && payload.files.length > 0) {
      const imagePaths = await payload.files.map((file) => file.path);
      update.images = imagePaths;
    }
    Object.assign(update, payload.body);
    const isUpdated = await Product.findByIdAndUpdate(id, update, {
      new: true,
    });
    return isUpdated;
  };

  addReview = async (payload,user,id) =>{
    const product = await Product.findById(id)
    const data ={
      user_id: user.id,
      rating: payload.rating,
      comment: payload.comment
    }
    console.log(product,'the product')
    if(product) {  
      const isReviewedIndex = product.reviews.findIndex((rev) => rev.user_id.toString() === user.id.toString());
      if (isReviewedIndex !== -1) {
          const reviewToUpdate = product.reviews[isReviewedIndex];
          reviewToUpdate.rating = payload.rating;
          reviewToUpdate.comment = payload.comment;
      }
      else {
          product.reviews.push(data);
      }
      const totalRatings = product.reviews.reduce((sum, rev) => sum + rev.rating, 0);
      product.totalrating = totalRatings / product.reviews.length;
      await product.save();
      return true;
    }
    else {
      return false;
    }


  }
}

module.exports = new ProductService();
