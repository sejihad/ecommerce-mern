const dotenv = require("dotenv");
dotenv.config();
const catchAsyncErrors = require("../middleware/catchAsyncErros");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

const sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

module.exports = { processPayment, sendStripeApiKey };
