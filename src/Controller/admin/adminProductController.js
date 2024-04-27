const trycatch = require('../../Middelware/trycatch.js');
const category = require('../../Models/ProductCategory/category');
const { success, fail } = require('../../Utils/sendResponse.js');
const messageConstant = require('../../Constants/MessageConstant.js')

const AdminProductService = require('../../Services/admin/adminProductServices.js');
const Products = require('../../Models/Products/Product.js');

const AddProduct = trycatch(async(req,res,next)=>{
    if(req.file){
        req.body.images = req.file.path
    }
    const data = await AdminProductService.addProduct(req.body)
    if(data) {
        return success(res,200,messageConstant.SUCCESS,data)    
    }else {
        return fail(res,400,messageConstant.FAIL,[])
    }
});

const EditProduct = trycatch(async(req,res,next) =>{
    const {id} = req.params
    if(req.file){
        req.body.images = req.file.path
    }
    const data = await AdminProductService.updateProducts(id,req.body)
    if(data) {
        return success(res,200,messageConstant.SUCCESS,data)    
    }else {
        return fail(res,400,messageConstant.FAIL,[])
    }
})

const DeleteProduct = trycatch(async(req,res,next) =>{
const {id} = req.params
const data = await  AdminProductService.deleteProducts(id)
if(data) {
    return success(res,200,messageConstant.SUCCESS,data)    
}else {
    return fail(res,400,messageConstant.FAIL,[])
}
});

const GetProductById = trycatch(async(req,res,next) =>{
    const {id} = req.params
    const product = await Products.findById(id)
    return success(res,200,messageConstant.SUCCESS,product)    
})
const GetProduct = trycatch(async(req,res,next) =>{
    const data = await AdminProductService.getAllProducts(req.query)
    success(res,200,messageConstant.SUCCESS,data)
})

module.exports = {AddProduct,EditProduct,DeleteProduct,GetProduct,GetProductById}