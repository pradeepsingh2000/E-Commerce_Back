const customer = require('../../Models/Customer/Customer')
const product = require('../../Models/Products/Product')

const getAllDashBoardDetails = async () => {
const allUser = this.CountAllUser()
const allProduct = this.CountAllProduct()

}

 const CountAllUser =  async () =>{
    const data = await customer.countDocuments()
    return data
 }


 const CountAllProduct = async() =>{
    const data = await product.countDocuments({isDelete:false})
    return data
 }
 