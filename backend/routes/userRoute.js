const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticator, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/me", isAuthenticator, getUserDetails);
router.put("/password/update", isAuthenticator, updatePassword);
router.put("/me/update", isAuthenticator, updateProfile);
router.get(
  "/admin/users",
  isAuthenticator,
  authorizeRoles("admin"),
  getAllUser
);

router
  .route("/admin/user/:id")
  .get(isAuthenticator, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticator, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticator, authorizeRoles("admin"), deleteUser);

module.exports = router;
