// import stripePackage from "stripe";

const Customer = require("../../Models/Customer/Customer");

// const stripe = stripePackage('sk_test_51Nh4XfSI7g01b63hVaGfwC0X5hXadA5n47ozLk17wKUnWAeAGckFCHrINFfK4yUJxekvsh5pWbxEYeWEhUCLeXcr00sTjXr6Bs');
const stripe = require("stripe")('sk_test_51NyxTZSABipdGMeGN3tJuHMvZX5KLkkXWRhCLLHV65SS5k3iJboeuC0IbvNl1837B11e66V4X6wDSUfp4nhfDUBR00zniBwWIe');

class CustomerCheckout {

    constructor(){}

    totalOrderAmount(orders) {
      return orders.reduce((total, order) => total + order.totalPrice, 0);
    }
    getProductId(orders) {
      return orders.map(order => order.productId)
    }
    


    createPaymentIntent = async (payload,user,res,next)=> {
      console.log(payload,'the body')
        const userInfo = await Customer.findById(user.id);
        const cartIds = await this.getProductId(payload.order); 
        // console.log(productIds,'the ids')

        const paymentIntent = await stripe.paymentIntents.create({
            amount:100*this.totalOrderAmount(payload.order),
            currency: "inr",
            automatic_payment_methods: {
              enabled: true,
            },
            metadata:{
             userName:userInfo.name,
             address:JSON.stringify(payload.setAdd),
             userId:user.id,
             userEmail:userInfo.email,
             CartId: JSON.stringify(cartIds)
            }
          });
          res.send({
            clientSecret: paymentIntent.client_secret,
          });
    }
}

module.exports = new CustomerCheckout();
    
    // static async AddPayment(req,res,next) {
    //     const {product} = req.body;

        // const lineItem = product.map((product) =>( {
        //     price_data :{
        //         currency : "inr",
        //         product_data:{
        //             name:product.name,

        //         },
        //         unit_amount :product.price * 100

        //     },
        //     quantity: product.qty
        // })
        // );
    //     const customer_details = {
    //         email:"customerEmail@gmail.com",
    //         phone:989823993,
    //         name:"Pradeep"
    //     }
    //     const Address ={
    //         city:"Surat",
    //         streat:12,
    //         state:"Gujarat"
    //     }
       
    //     const session = await stripes.checkout.sessions.create({
    //         payment_method_types:["card"],
    //         line_items:lineItem,
    //             mode:"payment",
                
    //             customer_email:customer_details.email,
    //             // customer:customer_details.name,
               
    //             // shipping_details:[{
    //             //     add:"c-13 sugam park"
    //             // }],
    //             success_url:'http://localhost:3000/',
    //             cancel_url:'http://localhost:3000/GetUser',

    //     })

    // app.post('/create-checkout-session', async (req, res) => {
    //     const session = await stripe.checkout.sessions.create({
    //       line_items: [
    //         {
    //           price_data: {
    //             currency: 'usd',
    //             product_data: {
    //               name: 'T-shirt',
    //             },
    //             unit_amount: 2000,
    //           },
    //           quantity: 1,
    //         },
    //       ],
    //       mode: 'payment',
    //       success_url: 'http://localhost:4242/success',
    //       cancel_url: 'http://localhost:4242/cancel',
    //     });
      
    //     res.redirect(303, session.url);
    //   })