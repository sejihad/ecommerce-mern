import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../../component/layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import "./ConfirmOrder.css";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };

  return (
    <>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />

      <Box className="confirm-order-container">
        <Box className="order-details-section">
          <Paper elevation={3} className="shipping-info-card">
            <Typography variant="h6" className="section-title">
              Shipping Information
            </Typography>
            <Divider />
            <Box className="info-grid">
              <Typography variant="subtitle2">Name:</Typography>
              <Typography>{user.name}</Typography>

              <Typography variant="subtitle2">Phone:</Typography>
              <Typography>{shippingInfo.phoneNo}</Typography>

              <Typography variant="subtitle2">Address:</Typography>
              <Typography>{address}</Typography>
            </Box>
          </Paper>

          <Paper elevation={3} className="cart-items-card">
            <Typography variant="h6" className="section-title">
              Your Cart Items
            </Typography>
            <Divider />
            <Box className="cart-items-container">
              {cartItems.map((item) => (
                <Box key={item.product} className="cart-item">
                  <img src={item.image} alt={item.name} className="c-o-image" />
                  <Link
                    to={`/product/${item.product}`}
                    className="product-name"
                  >
                    {item.name}
                  </Link>
                  <Typography className="product-price">
                    {item.quantity} × ${item.price} =
                    <strong> ${item.price * item.quantity}</strong>
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>

        <Box className="order-summary-section">
          <Paper elevation={3} className="order-summary-card">
            <Typography variant="h6" className="section-title">
              Order Summary
            </Typography>
            <Divider />

            <Box className="summary-row">
              <Typography>Subtotal:</Typography>
              <Typography>${subtotal.toFixed(2)}</Typography>
            </Box>

            <Box className="summary-row">
              <Typography>Shipping:</Typography>
              <Typography>${shippingCharges.toFixed(2)}</Typography>
            </Box>

            <Box className="summary-row">
              <Typography>Tax (18%):</Typography>
              <Typography>${tax.toFixed(2)}</Typography>
            </Box>

            <Divider className="total-divider" />

            <Box className="summary-row total-row">
              <Typography variant="subtitle1">Total:</Typography>
              <Typography variant="subtitle1">
                ${totalPrice.toFixed(2)}
              </Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              className="proceed-button"
              onClick={proceedToPayment}
            >
              Proceed to Payment
            </Button>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default ConfirmOrder;
