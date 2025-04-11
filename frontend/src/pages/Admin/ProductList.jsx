import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearErrors,
  deleteProduct,
  getAdminProduct,
} from "../../actions/productAction";
import MetaData from "../../component/layout/MetaData";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import "./productList.css";
import SideBar from "./Sidebar";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, products } = useSelector((state) => {
    return state.products || {};
  });

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product || {}
  );

  const deleteProductHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  useEffect(() => {
    if (isDeleted) {
      toast.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAdminProduct());
  }, [dispatch, navigate, isDeleted]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }
  }, [error, dispatch, deleteError]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 250, flex: 1 },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 100,
      flex: 0.3,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 150,
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => `$${params.value}`,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const id = params.row.id;
        return (
          <Fragment>
            <IconButton
              component={Link}
              to={`/admin/product/${id}`}
              aria-label="edit"
              color="primary"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => deleteProductHandler(id)}
              aria-label="delete"
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Fragment>
        );
      },
    },
  ];

  const rows =
    products?.map((item) => {
      return {
        id: item?._id,
        stock: item?.Stock,
        price: item?.price, // Ensure price is a valid number
        name: item?.name,
      };
    }) || [];

  return (
    <>
      <MetaData title="ALL PRODUCTS - Admin" />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <div className="productListHeader">
            <h1 id="productListHeading">ALL PRODUCTS</h1>
            <Button
              component={Link}
              to="/admin/product"
              variant="contained"
              color="primary"
              className="addProductBtn"
            >
              Add Product
            </Button>
          </div>

          <div className="dataGridWrapper">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 20, 50]}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
              sx={{
                boxShadow: 2,
                border: 2,
                borderColor: "primary.light",
                "& .MuiDataGrid-cell:hover": {
                  color: "primary.main",
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
