const express = require('express');
const { addCategory, getCategory, deleteCategory, editCategory } = require('../../Controller/brand&Category/brand&Category');
const router = express.Router();

router.post('/addCategory',addCategory);
router.get('/getCategory',getCategory);
router.delete('/deleteCategory/:id',deleteCategory);
router.put('/editCategory/:id',editCategory);

module.exports = router;