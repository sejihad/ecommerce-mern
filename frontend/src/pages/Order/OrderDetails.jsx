import { Box, Chip, Divider, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, getOrderDetails } from "../../actions/orderAction";
import Loader from "../../component/layout/Loader/Loader";
import MetaData from "../../component/layout/MetaData";
import "./orderDetails.css";

const OrderDetails = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "success";
      case "Shipped":
        return "info";
      case "Processing":
        return "warning";
      default:
        return "error";
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`Order #${order?._id}`} />
          <Box className="order-details-container">
            {/* Order Summary Card */}
            <Paper elevation={0} className="order-card summary-card">
              <Typography variant="h5" className="order-title">
                Order #{order?._id}
              </Typography>

              <Box className="section">
                <Typography variant="subtitle2" className="section-title">
                  Shipping Information
                </Typography>
                <Divider className="divider" />
                <Box className="info-grid">
                  <InfoItem label="Name" value={order?.user?.name} />
                  <InfoItem
                    label="Phone"
                    value={order?.shippingInfo?.phoneNo}
                  />
                  <InfoItem
                    label="Address"
                    value={`${order?.shippingInfo?.address}, ${order?.shippingInfo?.city}, 
                           ${order?.shippingInfo?.state}, ${order?.shippingInfo?.pinCode}, 
                           ${order?.shippingInfo?.country}`}
                    fullWidth
                  />
                </Box>
              </Box>

              <Box className="section">
                <Typography variant="subtitle2" className="section-title">
                  Payment Details
                </Typography>
                <Divider className="divider" />
                <Box className="info-grid">
                  <InfoItem
                    label="Status"
                    value={
                      <Chip
                        label={
                          order?.paymentInfo?.status === "succeeded"
                            ? "PAID"
                            : "NOT PAID"
                        }
                        color={
                          order?.paymentInfo?.status === "succeeded"
                            ? "success"
                            : "error"
                        }
                        size="small"
                      />
                    }
                  />
                  <InfoItem
                    label="Amount"
                    value={`$${order?.totalPrice?.toFixed(2)}`}
                  />
                </Box>
              </Box>

              <Box className="section">
                <Typography variant="subtitle2" className="section-title">
                  Order Status
                </Typography>
                <Divider className="divider" />
                <Box className="info-grid">
                  <InfoItem
                    label="Current Status"
                    value={
                      <Chip
                        label={order?.orderStatus}
                        color={getStatusColor(order?.orderStatus)}
                        size="small"
                      />
                    }
                  />
                </Box>
              </Box>
            </Paper>

            {/* Order Items Card */}
            <Paper elevation={0} className="order-card items-card">
              <Typography variant="subtitle2" className="section-title">
                Order Items ({order?.orderItems?.length})
              </Typography>
              <Divider className="divider" />
              <Box className="items-list">
                {order?.orderItems?.map((item) => (
                  <CompactOrderItem key={item.product} item={item} />
                ))}
              </Box>

              <Box className="order-total">
                <Typography variant="subtitle2">Order Total:</Typography>
                <Typography variant="subtitle1" className="total-amount">
                  ${order?.totalPrice?.toFixed(2)}
                </Typography>
              </Box>
            </Paper>
          </Box>
        </>
      )}
    </>
  );
};

// Reusable Info Item Component
const InfoItem = ({ label, value, fullWidth = false }) => (
  <Box className={`info-item ${fullWidth ? "full-width" : ""}`}>
    <Typography variant="caption" className="info-label">
      {label}
    </Typography>
    <Typography variant="body2" className="info-value">
      {value}
    </Typography>
  </Box>
);

// Compact Order Item Component
const CompactOrderItem = ({ item }) => (
  <Box className="compact-order-item">
    <Box className="compact-product-image-container">
      <img
        src={item.image}
        alt={item.name}
        className="compact-product-image"
        loading="lazy"
      />
    </Box>
    <Box className="compact-product-info">
      <Link to={`/product/${item.product}`} className="compact-product-name">
        {item.name}
      </Link>
      <Box className="compact-product-meta">
        <Typography variant="caption" className="compact-product-quantity">
          Qty: {item.quantity}
        </Typography>
        <Typography className="compact-product-price">
          ${(item.price * item.quantity).toFixed(2)}
        </Typography>
      </Box>
    </Box>
  </Box>
);

export default OrderDetails;
