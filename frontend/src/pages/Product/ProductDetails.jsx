import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addItemsToCart } from "../../actions/cartAction";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import Loader from "../../component/layout/Loader/Loader";
import MetaData from "../../component/layout/MetaData";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import "./ProductDetails.css";
import ReviewCard from "./ReviewCard";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // Redux state
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  // Local state
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [ratingError, setRatingError] = useState(false);

  // Handlers
  const increaseQuantity = () => {
    if (quantity >= product?.Stock) return;
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    toast.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    setOpen(!open);
    setRatingError(false);
  };

  const reviewSubmitHandler = () => {
    if (rating === 0) {
      setRatingError(true);
      toast.error("Please select a rating");
      return;
    }

    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));
  };

  // Effects
  useEffect(() => {
    if (success) {
      toast.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
      setRating(0);
      setComment("");
      setOpen(false);
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, success]);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }
  }, [error, dispatch, reviewError]);
  if (loading) return <Loader />;

  return (
    <>
      <MetaData title={`${product?.name} -- ECOMMERCE`} />

      <div className="product-details-container">
        {/* Product Images */}
        <div className="product-images">
          <Carousel
            animation="fade"
            navButtonsAlwaysVisible
            indicators={product?.images?.length > 1}
          >
            {product?.images?.map((item, i) => (
              <img
                key={i}
                src={item.url}
                alt={`${product?.name} - ${i + 1}`}
                className="product-image"
              />
            ))}
          </Carousel>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <div className="product-header">
            <h1 className="product-title">{product?.name}</h1>
            <p className="product-id">Product # {product?._id}</p>
          </div>

          <div className="product-rating">
            <Rating
              value={product?.ratings || 0}
              precision={0.5}
              readOnly
              size="large"
            />
            <span>({product?.numOfReviews} Reviews)</span>
          </div>

          <div className="product-pricing">
            <h2 className="product-price">${product?.price}</h2>

            <div className="quantity-selector">
              <button onClick={decreaseQuantity} aria-label="Decrease quantity">
                −
              </button>
              <input
                type="number"
                value={quantity}
                readOnly
                aria-label="Quantity"
              />
              <button onClick={increaseQuantity} aria-label="Increase quantity">
                +
              </button>
            </div>

            <button
              className="add-to-cart"
              onClick={addToCartHandler}
              disabled={!product?.Stock}
            >
              {product?.Stock ? "Add to Cart" : "Out of Stock"}
            </button>

            <p className="stock-status">
              Status:{" "}
              <span className={product?.Stock ? "in-stock" : "out-of-stock"}>
                {product?.Stock ? "In Stock" : "Out of Stock"}
              </span>
            </p>
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product?.description}</p>
          </div>

          <button className="submit-review-btn" onClick={submitReviewToggle}>
            Submit Review
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="reviews-section">
        <h2>Customer Reviews</h2>

        {product?.reviews && product.reviews.length > 0 ? (
          <div className="reviews-grid">
            {product.reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        ) : (
          <p className="no-reviews">No reviews yet</p>
        )}
      </section>

      {/* Review Dialog */}
      <Dialog open={open} onClose={submitReviewToggle}>
        <DialogTitle>Submit Your Review</DialogTitle>
        <DialogContent className="review-dialog-content">
          <div className="rating-container">
            <Rating
              value={rating}
              onChange={(e, newValue) => {
                setRating(newValue);
                if (newValue > 0) setRatingError(false);
              }}
              size="large"
              precision={0.5}
            />
            {ratingError && (
              <Typography color="error" variant="caption">
                * Rating is required
              </Typography>
            )}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product..."
            rows={5}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={submitReviewToggle} color="secondary">
            Cancel
          </Button>
          <Button onClick={reviewSubmitHandler} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductDetails;
