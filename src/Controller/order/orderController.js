const { success, fail } = require("../../Utils/sendResponse.js");
const trycathFn = require("../../Middelware/trycatch.js");
const CustomerCheckout = require("../../Services/customer/customerCheckout.js");
const addtocart = require("../../Models/Addtocart/addtocart.js");
const Order = require("../../Models/Order/order.js");
const stripe = require("stripe")(
  "sk_test_51NyxTZSABipdGMeGN3tJuHMvZX5KLkkXWRhCLLHV65SS5k3iJboeuC0IbvNl1837B11e66V4X6wDSUfp4nhfDUBR00zniBwWIe"
);
const endpoint_secret =
  "whsec_26736e5dc9f31b6b57c2c342565657174d9faa1bedd997d045ae690d3af35565";

const Payment = trycathFn(async (req, res, next) => {
  const payment = await CustomerCheckout.createPaymentIntent(
    req.body,
    req.user,
    res,
    next
  );
});

const Webhook = trycathFn(async (req, res, next) => {
  const sig = req.headers["stripe-signature"];
  let event;
  console.log(event, "the event");
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpoint_secret);
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object;
        console.log(paymentIntentSucceeded, "the payment");
        const orderId = paymentIntentSucceeded.metadata.CartId;
        const jsonSubstring = orderId.substring(
          orderId.indexOf("["),
          orderId.lastIndexOf("]") + 1
        );
        console.log(jsonSubstring, "jsonSubstring");
        const jsonArray = JSON.parse(jsonSubstring);
          
        const data = await Order.create({
          productIds: jsonArray,
          address:paymentIntentSucceeded.metadata.address,
          totalAmount:(paymentIntentSucceeded.amount)/100,
          userId: paymentIntentSucceeded.metadata.userId,
        });
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.send();
  } catch (err) {
    console.log(`Error: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
});

module.exports = { Payment, Webhook };
