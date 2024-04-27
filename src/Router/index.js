const express = require('express');
const app = express();
const Admin = require('./Admin/index.js');
const Customer = require('./Customer/index.js');
app.use('/admin',Admin)
app.use('/customer',Customer);

module.exports = app;