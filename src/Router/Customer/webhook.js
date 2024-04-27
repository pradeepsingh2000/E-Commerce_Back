const express = require('express');
const router = express.Router();
const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.raw({type: 'application/json'}))
// const bodyParser = require('body-parser');

const orderController = require('../../Controller/order/orderController')
// app.use(bodyParser.json());
// app.use(express.raw({ type: 'application/json' }));

router.post('/webhook',orderController.Webhook)

// router.post('/webhook', (req, res) => {
//     // Assuming the webhook payload should be in the request body
//     const rawPayload = JSON.stringify(req.body); // Convert the parsed object to a string
//     orderController.Webhook(rawPayload); // Pass the rawPayload to your controller
//   });


module.exports = router;