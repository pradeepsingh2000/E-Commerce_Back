const express = require('express');
const app = express();
const adminProduct = require('./adminProductRoute');
const adminAuthRouter = require('./adminAuthRouter');
const adminCategory = require('./adminCategoryRoutes');
const adminDashboardRoutes = require('./adminDashboardRoutes');
app.use('/auth',adminAuthRouter);
app.use('/products',adminProduct);
app.use('/category',adminCategory);
app.use('/dashboard',adminDashboardRoutes)

module.exports = app;

