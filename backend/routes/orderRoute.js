const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  updateOrder,
  deleteOrder,
  getAllOrders,
} = require("../controllers/orderController");
const router = express.Router();
const { isAuthenticator, authorizeRoles } = require("../middleware/auth");

router.post("/order/new", isAuthenticator, newOrder);
router.get("/order/:id", isAuthenticator, getSingleOrder);
router.get("/orders/me", isAuthenticator, myOrders);

router.get(
  "/admin/orders",
  isAuthenticator,
  authorizeRoles("admin"),
  getAllOrders
);

router
  .route("/admin/order/:id")
  .put(isAuthenticator, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticator, authorizeRoles("admin"), deleteOrder);

module.exports = router;
