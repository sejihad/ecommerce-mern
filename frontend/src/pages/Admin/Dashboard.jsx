import { Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllOrders } from "../../actions/orderAction.jsx";
import { getAdminProduct } from "../../actions/productAction.jsx";
import { getAllUsers } from "../../actions/userAction.jsx";
import MetaData from "../../component/layout/MetaData.jsx";
import Sidebar from "./Sidebar.jsx";
import "./dashboard.css";

// Chart.js components registration
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;
  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        borderColor: "tomato",
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
        borderWidth: 1,
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography variant="h4" className="dashboardTitle">
          Admin Dashboard
        </Typography>

        <div className="dashboardSummary">
          <div className="totalAmountCard">
            <p className="totalAmountLabel">Total Revenue</p>
            <p className="totalAmountValue">${totalAmount.toFixed(2)}</p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products" className="summaryCard products-t">
              <p className="summaryTitle">Products</p>
              <p className="summaryValue">{products && products.length}</p>
            </Link>
            <Link to="/admin/orders" className="summaryCard orders">
              <p className="summaryTitle">Orders</p>
              <p className="summaryValue">{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users" className="summaryCard users">
              <p className="summaryTitle">Users</p>
              <p className="summaryValue">{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="chartContainer">
          <div className="lineChart">
            <Line data={lineState} options={options} />
          </div>
          <div className="doughnutChart">
            <Doughnut data={doughnutState} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
