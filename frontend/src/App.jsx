import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Footer from "./component/layout/Footer/Footer.jsx";
import Header from "./component/layout/Header/Header.jsx";
import ProtectedRoute from "./component/Route/ProtectedRoute.jsx";
import About from "./pages/About/About.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import NewProduct from "./pages/Admin/NewProduct.jsx";
import OrderList from "./pages/Admin/OrderList.jsx";
import ProcessOrder from "./pages/Admin/ProcessOrder.jsx";
import ProductList from "./pages/Admin/ProductList.jsx";
import ProductReviews from "./pages/Admin/ProductReviews.jsx";
import UpdateProduct from "./pages/Admin/UpdateProduct.jsx";
import UpdateUser from "./pages/Admin/UpdateUser.jsx";
import UsersList from "./pages/Admin/UsersList.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import ConfirmOrder from "./pages/Cart/ConfirmOrder.jsx";
import OrderSuccess from "./pages/Cart/OrderSuccess.jsx";
import Payment from "./pages/Cart/Payment.jsx";
import Shipping from "./pages/Cart/Shipping.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Home from "./pages/Home/Home.jsx";
import Notfound from "./pages/Not Found/NotFound.jsx";
import MyOrders from "./pages/Order/MyOrders.jsx";
import OrderDetails from "./pages/Order/OrderDetails.jsx";
import ProductDetails from "./pages/Product/ProductDetails.jsx";
import Products from "./pages/Product/Products.jsx";
import Search from "./pages/Product/Search.jsx";
import ForgotPassword from "./pages/User/ForgotPassword.jsx";
import LoginSignUp from "./pages/User/LoginSignUp.jsx";
import Profile from "./pages/User/Profile.jsx";
import ResetPassword from "./pages/User/ResetPassword.jsx";
import UpdatePassword from "./pages/User/UpdatePassword.jsx";
import UpdateProfile from "./pages/User/UpdateProfile.jsx";
import { API_URL } from "./utils/utils.jsx";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  // Fetch Stripe API Key
  async function getStripeApiKey() {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `${API_URL}/api/v1/stripeapikey`,
        config
      );
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getStripeApiKey();
  }, []);

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        {/* error page */}
        <Route path="*" element={<Notfound />} />
        {/* Protected User Route */}
        <Route
          path="/process/payment"
          element={
            <ProtectedRoute>
              {stripeApiKey && (
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              )}
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/me/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/password/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shipping"
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/confirm"
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />

        {/* Protected Admin Route */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProductList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/product"
          element={
            <ProtectedRoute isAdmin={true}>
              <NewProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/product/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute isAdmin={true}>
              <OrderList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/order/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProcessOrder />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute isAdmin={true}>
              <UsersList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/user/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProductReviews />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
