import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearErrors,
  getOrderDetails,
  updateOrder,
} from "../../actions/orderAction";
import Loader from "../../component/layout/Loader/Loader";
import MetaData from "../../component/layout/MetaData";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import "./processOrder.css";
import SideBar from "./Sidebar";
const ProcessOrder = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateOrder(id, myForm));
  };

  useEffect(() => {
    if (isUpdated) {
      toast.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, id, isUpdated]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
  }, [error, updateError, dispatch]);

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <Box className="dashboard">
        <SideBar />
        <Box className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <Box
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <Paper elevation={3} className="orderDetailsSection">
                <Typography variant="h6" className="sectionTitle">
                  Shipping Info
                </Typography>
                <Box className="orderDetailsContainerBox">
                  <div>
                    <p>Name:</p>
                    <span>{order.user && order.user.name}</span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>
                      {order.shippingInfo && order.shippingInfo.phoneNo}
                    </span>
                  </div>
                  <div>
                    <p>Address:</p>
                    <span>
                      {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                    </span>
                  </div>
                </Box>

                <Typography variant="h6" className="sectionTitle">
                  Payment
                </Typography>
                <Box className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "PAID"
                        : "NOT PAID"}
                    </p>
                  </div>

                  <div>
                    <p>Amount:</p>
                    <span>${order.totalPrice && order.totalPrice}</span>
                  </div>
                </Box>

                <Typography variant="h6" className="sectionTitle">
                  Order Status
                </Typography>
                <Box className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        order.orderStatus && order.orderStatus === "Delivered"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order.orderStatus && order.orderStatus}
                    </p>
                  </div>
                </Box>
              </Paper>

              <Box className="orderItemsSection">
                <Typography variant="h6" className="sectionTitle">
                  Your Cart Items:
                </Typography>
                <Box className="confirmCartItemsContainer">
                  {order.orderItems &&
                    order.orderItems.map((item) => (
                      <Box key={item.product} className="cartItem">
                        <img src={item.image} alt="Product" />
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                        <span>
                          {item.quantity} × ${item.price} ={" "}
                          <b>${item.price * item.quantity}</b>
                        </span>
                      </Box>
                    ))}
                </Box>
              </Box>

              {order.orderStatus !== "Delivered" && (
                <Paper elevation={3} className="processOrderForm">
                  <Typography variant="h5" className="formTitle">
                    Process Order
                  </Typography>
                  <form onSubmit={updateOrderSubmitHandler}>
                    <FormControl fullWidth className="statusSelect">
                      <InputLabel id="status-label">
                        <AccountTreeIcon className="selectIcon" />
                        Update Status
                      </InputLabel>
                      <Select
                        labelId="status-label"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                      >
                        <MenuItem value="">
                          <em>Choose Status</em>
                        </MenuItem>
                        {order.orderStatus === "Processing" && (
                          <MenuItem value="Shipped">Shipped</MenuItem>
                        )}
                        {order.orderStatus === "Shipped" && (
                          <MenuItem value="Delivered">Delivered</MenuItem>
                        )}
                      </Select>
                    </FormControl>

                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      className="processButton"
                      disabled={loading || !status}
                    >
                      {loading ? "Processing..." : "Process"}
                    </Button>
                  </form>
                </Paper>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Fragment>
  );
};

export default ProcessOrder;
