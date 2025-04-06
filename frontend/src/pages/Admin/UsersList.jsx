import { Delete, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, deleteUser, getAllUsers } from "../../actions/userAction";
import MetaData from "../../component/layout/MetaData";
import { DELETE_USER_RESET } from "../../constants/userContants";
import "./productList.css";
import SideBar from "./Sidebar";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, users } = useSelector((state) => state.allUsers || {});
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile || {});

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (isDeleted) {
      toast.success(message || "User deleted successfully");
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, navigate, isDeleted, message]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }
  }, [error, deleteError, dispatch]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) =>
        params.row.role === "admin" ? "greenColor" : "redColor",
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <Fragment>
          <Link to={`/admin/user/${params.row.id}`}>
            <Edit />
          </Link>
          <Button onClick={() => deleteUserHandler(params.row.id)}>
            <Delete />
          </Button>
        </Fragment>
      ),
    },
  ];

  const rows =
    users?.map((item) => ({
      id: item._id,
      role: item.role,
      email: item.email,
      name: item.name,
    })) || [];

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
