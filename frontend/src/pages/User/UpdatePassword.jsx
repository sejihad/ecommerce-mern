import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, logout, updatePassword } from "../../actions/userAction";
import Loader from "../../component/layout/Loader/Loader";
import MetaData from "../../component/layout/MetaData";
import { UPDATE_PASSWORD_RESET } from "../../constants/userContants.jsx";
import "./UpdatePassword.css";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    showPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setPasswords((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    const formData = new FormData();
    formData.set("oldPassword", passwords.oldPassword);
    formData.set("newPassword", passwords.newPassword);
    formData.set("confirmPassword", passwords.confirmPassword);

    dispatch(updatePassword(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Password changed successfully!");
      dispatch(logout());
      navigate("/login");
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, isUpdated, navigate]);

  if (loading) return <Loader />;

  return (
    <>
      <MetaData title="Change Password" />
      <div className="update-password-container">
        <div className="password-card">
          <div className="card-header">
            <h2>Update Your Password</h2>
            <p>Enter your current and new password</p>
          </div>

          <form onSubmit={updatePasswordSubmit}>
            <div className="input-group">
              <VpnKeyIcon className="input-icon" />
              <input
                type={passwords.showPassword ? "text" : "password"}
                name="oldPassword"
                placeholder="Current Password"
                value={passwords.oldPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <LockOpenIcon className="input-icon" />
              <input
                type={passwords.showPassword ? "text" : "password"}
                name="newPassword"
                placeholder="New Password"
                value={passwords.newPassword}
                onChange={handleChange}
                required
                minLength="6"
              />
            </div>

            <div className="input-group">
              <LockIcon className="input-icon" />
              <input
                type={passwords.showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={passwords.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="password-toggle">
              <button
                type="button"
                onClick={togglePasswordVisibility}
                aria-label={
                  passwords.showPassword ? "Hide passwords" : "Show passwords"
                }
              >
                {passwords.showPassword ? "🙈 Hide" : "👁️ Show"} Passwords
              </button>
            </div>

            <button type="submit" className="submit-btn">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
