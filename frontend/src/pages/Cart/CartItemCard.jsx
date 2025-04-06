import { Delete } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./CartItemCard.css";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="cart-item-card">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <Link to={`/product/${item.product}`} className="cart-item-name">
          {item.name}
        </Link>
        <Typography variant="body2" className="cart-item-price">
          ${item.price.toFixed(2)}
        </Typography>
        <div className="cart-item-actions">
          <IconButton
            onClick={() => deleteCartItems(item.product)}
            aria-label="remove item"
            className="remove-item-btn"
          >
            <Delete fontSize="small" />
            <span>Remove</span>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
