const express = require('express');
const { getAllDetail, getCountOfOrderByMonth, getAllOrderDetail, updateStatus, getOrderById } = require('../../Controller/admin/adminDashboardController');
const router = express.Router();


router.get('/getAlldata',getAllDetail)
router.get('/getCountOfOrderByMonth',getCountOfOrderByMonth)
router.get('/getAllOrder',getAllOrderDetail)
router.put('/updateStatus/:id',updateStatus)
router.get('/getOrderById/:id',getOrderById)

module.exports = router;