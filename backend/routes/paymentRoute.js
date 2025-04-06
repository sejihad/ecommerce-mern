const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentController");
const router = express.Router();
const { isAuthenticator } = require("../middleware/auth");

router.post("/payment/process", isAuthenticator, processPayment);

router.get("/stripeapikey", isAuthenticator, sendStripeApiKey);

module.exports = router;
