const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const errorMiddleware = require("./middleware/error");
const fileUplaod = require("express-fileupload");
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
const cookieParser = require("cookie-parser");
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(fileUplaod());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// route
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// middleware
app.use(errorMiddleware);

module.exports = app;
