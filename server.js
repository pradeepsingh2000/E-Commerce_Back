const express = require("express")
const bodyParser = require('body-parser'); // Import body-parser
const dotenv = require('dotenv');
dotenv.config();

const connectDatabase = require("./src/Config/database.js")
const mainRoutes = require("./src/Router/index.js"); // Adjust the path
const cors = require('cors');
const { Webhook } = require("./src/Controller/order/orderController.js");
const { required } = require("joi");

const app = express()
app.use(cors());

app.listen(10000, function () {
console.log("Started application on port %d", 10000)
});
app.use('/uploads', express.static('uploads'));
app.use('/productimage', express.static('productimage'))
// app.use()
app.use(express.raw())
// app.use(express.json());
app.use('/webhook',express.raw({ type: 'application/json' }),Webhook)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use('/',mainRoutes)


connectDatabase();