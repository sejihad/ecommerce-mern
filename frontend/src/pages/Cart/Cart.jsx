import { Add, Remove, RemoveShoppingCart } from "@mui/icons-material";
import { Button, IconButton, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import "./Cart.css";
import CartItemCard from "./CartItemCard";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticted } = useSelector((state) => state.user);

  const increaseQuantity = (id, quantity, stock) => {
    if (quantity >= stock) return;
    dispatch(addItemsToCart(id, quantity + 1));
  };

  const decreaseQuantity = (id, quantity) => {
    if (quantity <= 1) return;
    dispatch(addItemsToCart(id, quantity - 1));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <div className="cart-container">
      {cartItems?.length === 0 ? (
        <div className="empty-cart">
          <RemoveShoppingCart className="empty-cart-icon" />
          <Typography variant="h5" className="empty-cart-text">
            Your Cart is Empty
          </Typography>
          <Typography variant="body1" className="empty-cart-subtext">
            Looks like you haven't added anything to your cart yet
          </Typography>
          <Button
            component={Link}
            to="/products"
            variant="contained"
            className="shop-now-btn"
          >
            Shop Now
          </Button>
        </div>
      ) : (
        <>
          <div className="cart-header">
            <Typography variant="h4" className="cart-title">
              Shopping Cart
            </Typography>
            <Typography variant="subtitle1" className="cart-item-count">
              {cartItems.length} {cartItems.length > 1 ? "Items" : "Item"}
            </Typography>
          </div>

          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />

                  <div className="quantity-controls">
                    <IconButton
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                      aria-label="decrease quantity"
                    >
                      <Remove />
                    </IconButton>
                    <Typography className="quantity-value">
                      {item.quantity}
                    </Typography>
                    <IconButton
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                      aria-label="increase quantity"
                    >
                      <Add />
                    </IconButton>
                  </div>

                  <Typography className="item-subtotal">
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-card">
                <Typography variant="h6" className="summary-title">
                  Order Summary
                </Typography>
                <div className="summary-row">
                  <Typography>Subtotal</Typography>
                  <Typography>${totalPrice.toFixed(2)}</Typography>
                </div>
                <div className="summary-row">
                  <Typography>Shipping</Typography>
                  <Typography>Free</Typography>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total">
                  <Typography>Total</Typography>
                  <Typography>${totalPrice.toFixed(2)}</Typography>
                </div>
                <Button
                  variant="contained"
                  className="checkout-btn"
                  onClick={checkoutHandler}
                  fullWidth
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
