const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const errorMiddleware = require("./middleware/error");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

dotenv.config();

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// ✅ File Upload Middleware Fix
app.use(fileUpload());

// ✅ CORS Middleware Fix
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Access-Control-Allow-Credentials",
    ],
  })
);

// API Routes
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// Error Middleware
app.use(errorMiddleware);

module.exports = app;
