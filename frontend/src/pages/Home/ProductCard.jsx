import { Rating } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const options = {
    value: product?.ratings || 0,
    readOnly: true,
    precision: 0.5,
    size: "small",
  };

  return (
    <Link className="product-card" to={`/product/${product?._id}`}>
      <div className="product-image-container">
        <div className="image-wrapper">
          <img
            src={product?.images?.[0]?.url || "/images/placeholder.jpg"}
            alt={product?.name || "Product"}
            className="product-image"
            loading="lazy"
            onError={(e) => {
              e.target.src = "/images/placeholder.jpg";
            }}
          />
        </div>
      </div>
      <div className="product-details">
        <h3 className="product-name">{product?.name || "Product Name"}</h3>
        <div className="product-rating">
          <Rating {...options} />
          <span className="review-count">
            ({product?.numOfReviews || 0} reviews)
          </span>
        </div>
        <p className="product-price">
          ${product?.price?.toFixed(2) || "00.00"}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
