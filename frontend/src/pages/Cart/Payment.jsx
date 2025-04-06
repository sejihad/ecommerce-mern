import {
  CreditCard as CreditCardIcon,
  Event as EventIcon,
  VpnKey as VpnKeyIcon,
} from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, createOrder } from "../../actions/orderAction";
import MetaData from "../../component/layout/MetaData";
import { API_URL } from "../../utils/utils";
import CheckoutSteps from "./CheckoutSteps";
import "./payment.css";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const orderInfo = sessionStorage.getItem("orderInfo")
    ? JSON.parse(sessionStorage.getItem("orderInfo"))
    : null;

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  if (!orderInfo) {
    toast.error("Order information is missing");
    return null;
  }

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (payBtn.current) {
      payBtn.current.disabled = true;
    }

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/v1/payment/process`,
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        if (payBtn.current) {
          payBtn.current.disabled = false;
        }
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          localStorage.removeItem("cartItems");

          dispatch(createOrder(order));
          navigate("/success");
        } else {
          toast.error("There's some issue while processing payment");
        }
      }
    } catch (error) {
      if (payBtn.current) {
        payBtn.current.disabled = false;
      }
      toast.error(error.response?.data?.message || "Payment processing failed");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  return (
    <>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />

      <Box className="payment-container">
        <Paper elevation={3} className="payment-card">
          <Typography variant="h5" className="payment-title">
            Payment Details
          </Typography>

          <form onSubmit={submitHandler} className="payment-form">
            <Box className="form-group">
              <Typography variant="subtitle2" className="input-label">
                Card Number
              </Typography>
              <Box className="stripe-input-container">
                <CreditCardIcon className="input-icon" />
                <CardNumberElement
                  options={cardElementOptions}
                  className="stripe-input"
                />
              </Box>
            </Box>

            <Box className="form-row">
              <Box className="form-group" style={{ flex: 1 }}>
                <Typography variant="subtitle2" className="input-label">
                  Expiration Date
                </Typography>
                <Box className="stripe-input-container">
                  <EventIcon className="input-icon" />
                  <CardExpiryElement
                    options={cardElementOptions}
                    className="stripe-input"
                  />
                </Box>
              </Box>

              <Box className="form-group" style={{ flex: 1 }}>
                <Typography variant="subtitle2" className="input-label">
                  CVC
                </Typography>
                <Box className="stripe-input-container">
                  <VpnKeyIcon className="input-icon" />
                  <CardCvcElement
                    options={cardElementOptions}
                    className="stripe-input"
                  />
                </Box>
              </Box>
            </Box>

            <Box className="amount-display">
              <Typography variant="h6">
                Total Amount: ${orderInfo.totalPrice.toFixed(2)}
              </Typography>
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="pay-button"
              ref={payBtn}
            >
              Pay Now
            </Button>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default Payment;
