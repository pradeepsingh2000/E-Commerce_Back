const trycatch = require("../../Middelware/trycatch.js");
const { success, fail } = require("../../Utils/sendResponse.js");
const messageConstant = require("../../Constants/MessageConstant.js");
const Customer = require("../../Models/Customer/Customer.js");
const Order = require("../../Models/Order/order.js");
const Products = require("../../Models/Products/Product.js");
const ObjectId = require("mongoose").Types.ObjectId;

const getAllDetail = async (req, res, next) => {
  const product = await Products.countDocuments({ isDelete: false });
  const customers = await Customer.countDocuments();
  const order = await Order.countDocuments();
  const totalRevenue = await Order.aggregate([
    {
      $group:{
        _id: null,
        totalAmountSum: { $sum: "$totalAmount" }
      }
    }
  ])
  const data = {
    products: product,
    customer: customers,
    order: order,
    totalRevenue:totalRevenue[0].totalAmountSum
  };
  return success(res, 200, "SUCCESS", data);
};

const getCountOfOrderByMonth = async (req, res, next) => {
    const {year} = req.query
  const data = await Order.aggregate([
    {
      $addFields: {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" },
      },
    },
    {
      $match: {
        year: parseInt(year),
      },
    },
    {
      $group: {
        _id: "$month",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        month: "$_id",
        count: 1,
      },
    },
    {
      $sort: {
        month: 1,
      },
    },
  ]);
  return success(res, 200, "SUCCESS", data);

};

const getAllOrderDetail = async (req, res, next) => {
  try {
    let { search, page, limit } = req.query;
    let option = {
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 10,
    };
    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: new RegExp(search, "i") } },
        { category: { $regex: new RegExp(search, "i") } },
        { brand: { $regex: new RegExp(search, "i") } },
      ];
    }

    const data = await Order.aggregate([
      {
        $match: query,
      },
      {
        $unwind: "$productIds",
      },
      {
        $lookup: {
          from: "products",
          localField: "productIds",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "userId",
          foreignField: "_id",
          as: "customerInfo",
        },
      },
      {
        $unwind: "$customerInfo",
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: (option.page - 1) * option.limit,
      },
      {
        $limit: option.limit,
      },
    ])

    const totalDoc = await Order.countDocuments();
    const totalPage = Math.ceil(totalDoc / option.limit);

    const responseData = {
      data,
      totalDoc,
      page: option.page,
      limit: option.limit,
      totalPage,
    };

    // Assuming `success` is a function to handle successful responses
    return success(res, 200, "SUCCESS", responseData);
  } catch (err) {
    console.error(err);
    // Handle errors appropriately
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getOrderById = async (req,res,next) =>{
  try {
    let { id } = req.params;
   
  

    const data = await Order.aggregate([
      {
        $match: {_id: new ObjectId(id)},
      },
      {
        $unwind: "$productIds",
      },
      {
        $lookup: {
          from: "products",
          localField: "productIds",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "userId",
          foreignField: "_id",
          as: "customerInfo",
        },
      },
      {
        $unwind: "$customerInfo",
      },
   
    ])

 

    return success(res, 200, "SUCCESS", data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
const updateStatus = async (req, res) => {

  try{
    const {id} = req.params
    const {status} = req.body
    console.log(id,status,'djjsk')
    const data = await Order.findByIdAndUpdate(id,{status:status},{new:true});
    return success(res, 200, "SUCCESS", data);
  }
  catch(err){
    console.log(err);
  }
};




module.exports = { getAllDetail,getCountOfOrderByMonth,getAllOrderDetail,updateStatus,getOrderById };
