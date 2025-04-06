import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleIcon from "@mui/icons-material/People";
import PostAddIcon from "@mui/icons-material/PostAdd";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/admin/dashboard" className="sidebar-link">
        <DashboardIcon className="sidebar-icon" />
        <span>Dashboard</span>
      </Link>

      <div className="tree-view-container">
        <SimpleTreeView>
          <TreeItem
            itemId="1"
            label={
              <div className="tree-parent">
                <ImportExportIcon className="sidebar-icon" />
                <span>Products</span>
              </div>
            }
          >
            <Link to="/admin/products" className="tree-child-link">
              <TreeItem
                itemId="2"
                label={
                  <div className="tree-child">
                    <PostAddIcon className="sidebar-icon" />
                    <span>All</span>
                  </div>
                }
              />
            </Link>
            <Link to="/admin/product" className="tree-child-link">
              <TreeItem
                itemId="3"
                label={
                  <div className="tree-child">
                    <AddIcon className="sidebar-icon" />
                    <span>Create</span>
                  </div>
                }
              />
            </Link>
          </TreeItem>
        </SimpleTreeView>
      </div>

      <Link to="/admin/orders" className="sidebar-link">
        <ListAltIcon className="sidebar-icon" />
        <span>Orders</span>
      </Link>
      <Link to="/admin/users" className="sidebar-link">
        <PeopleIcon className="sidebar-icon" />
        <span>Users</span>
      </Link>
      <Link to="/admin/reviews" className="sidebar-link">
        <RateReviewIcon className="sidebar-icon" />
        <span>Reviews</span>
      </Link>
    </div>
  );
};

export default Sidebar;
