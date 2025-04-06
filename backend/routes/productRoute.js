const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controllers/productController");
const { isAuthenticator, authorizeRoles } = require("../middleware/auth");

const router = express.Router();
router.get("/products", getAllProducts);
router.get(
  "/admin/products",
  isAuthenticator,
  authorizeRoles("admin"),
  getAdminProducts
);
router.post(
  "/admin/product/new",
  isAuthenticator,
  authorizeRoles("admin"),
  createProduct
);
router
  .route("/admin/product/:id")
  .put(isAuthenticator, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticator, authorizeRoles("admin"), deleteProduct);
router.get("/product/:id", getProductDetails);
router.put("/review", isAuthenticator, createProductReview);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticator, deleteReview);
module.exports = router;
