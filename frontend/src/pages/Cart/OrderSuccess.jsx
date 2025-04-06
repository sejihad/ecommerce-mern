import { CheckCircle } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./orderSuccess.css";

const OrderSuccess = () => {
  return (
    <Box className="order-success-container">
      <Paper elevation={3} className="order-success-card">
        <CheckCircle className="success-icon" />

        <Typography variant="h4" className="success-title">
          Order Placed Successfully!
        </Typography>

        <Typography variant="body1" className="success-message">
          Thank you for your purchase. Your order has been confirmed and will be
          processed shortly.
        </Typography>

        <Box className="action-buttons">
          <Button
            variant="contained"
            component={Link}
            to="/orders"
            className="view-orders-btn"
          >
            View Your Orders
          </Button>

          <Button
            variant="outlined"
            component={Link}
            to="/products"
            className="continue-shopping-btn"
          >
            Continue Shopping
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default OrderSuccess;
