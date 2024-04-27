const express = require('express');
const app = express();


const customerAuthRouter = require('./customerAuthRouter'); 
const customerAccount = require('./customerAccountRouter');
const customerProduct = require('./customerProductRoutes');
const webhook = require('./webhook');
app.use('/auth',customerAuthRouter);
app.use('/account',customerAccount);
app.use('/products',customerProduct);
app.use('/stripe',webhook)

module.exports = app;


