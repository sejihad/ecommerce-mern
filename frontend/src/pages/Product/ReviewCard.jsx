import { Rating } from "@mui/material";
import React from "react";
import profilePng from "../../images/Profile.png";
import "./ReviewCard.css";

const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">
      <div className="review-card__header">
        <img
          src={profilePng}
          alt={review.name}
          className="review-card__avatar"
        />
        <div className="review-card__user-info">
          <h4 className="review-card__username">{review.name}</h4>
          <div className="review-card__rating">
            <Rating
              value={review.rating}
              readOnly
              precision={0.5}
              size="medium"
            />
          </div>
        </div>
      </div>
      <div className="review-card__body">
        <p className="review-card__comment">{review.comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
