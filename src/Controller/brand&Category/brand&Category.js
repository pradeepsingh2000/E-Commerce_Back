
const trycatch = require('../../Middelware/trycatch.js');
const category = require('../../Models/ProductCategory/category');
const { success, fail } = require('../../Utils/sendResponse.js');
const messageConstant = require('../../Constants/MessageConstant.js')

const addCategory = trycatch(async (req,res,next) =>  {
    const data = await category.create({
        name:req.body.name,
    });
    if(data) success(res,200,messageConstant.SUCCESS,data);
    else  fail(res,400,messageConstant.ERROR,[])
})

const deleteCategory = trycatch(async (req,res,next) => {
    const id = req.params.id;
    const data = await category.findByIdAndUpdate(id,{isActive:false},{new:true});
    if(data) success(res,200,messageConstant.SUCCESS,[])
    else  fail(res,400,messageConstant.FAIL,[])
})

const editCategory = trycatch(async (req,res,next) => {
    const id = req.params.id
    const data = await category.findByIdAndUpdate(id,req.body,{new:true})
    if(data) success(res,200,messageConstant.SUCCESS,data)
    else  fail(res,400,messageConstant.FAIL,[])
})

const getCategory = trycatch(async (req,res,next) => {
    const data = await category.find({isActive:true})
    if(data) success(res,200,messageConstant.SUCCESS,data)
    else  fail(res,400,messageConstant.FAIL,[])
});


module.exports = {addCategory,deleteCategory,editCategory,getCategory}