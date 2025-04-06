import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../../component/layout/Loader/Loader.jsx";
import "./myOrders.css";

import LaunchIcon from "@material-ui/icons/Launch";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import MetaData from "../../component/layout/MetaData.jsx";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 250,
      flex: 1,
      renderCell: (params) => (
        <span className="order-id-cell">{params.value.substring(0, 8)}...</span>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      flex: 0.5,
      cellClassName: (params) =>
        params.row.status === "Delivered" ? "greenColor" : "redColor",
    },
    {
      field: "itemsQty",
      headerName: "Items",
      type: "number",
      minWidth: 80,
      flex: 0.3,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 120,
      flex: 0.5,
      renderCell: (params) => <span>${params.value.toFixed(2)}</span>,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 80,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Link to={`/order/${params.row.id}`} className="order-action-link">
          <LaunchIcon fontSize="small" />
        </Link>
      ),
    },
  ];

  const rows = orders
    ? orders.map((item) => ({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      }))
    : [];

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, error]);

  return (
    <>
      <MetaData title={`${user?.name || "User"} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="my-orders-container">
          <Typography variant="h5" className="my-orders-title">
            {user?.name || "User"}'s Orders
          </Typography>

          <div className="orders-data-grid-container">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5, 10, 20]}
              disableSelectionOnClick
              autoHeight
              className="orders-data-grid"
              componentsProps={{
                pagination: {
                  sx: {
                    "& .MuiTablePagination-displayedRows": {
                      fontSize: "0.8rem",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MyOrders;
