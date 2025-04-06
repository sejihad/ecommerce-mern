import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, resetPassword } from "../../actions/userAction";
import Loader from "../../component/layout/Loader/Loader";
import MetaData from "../../component/layout/MetaData";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const { token } = useParams();
  const navigate = useNavigate();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwords.password !== passwords.confirmPassword) {
      toast.error("Passwords don’t match!");
      return;
    }
    dispatch(resetPassword(token, passwords));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Password updated successfully!");
      navigate("/login");
    }
  }, [dispatch, error, success, navigate]);

  if (loading) return <Loader />;

  return (
    <>
      <MetaData title="Reset Password" />
      <div className="resetPasswordContainer">
        <div className="resetPasswordBox">
          <h2 className="resetPasswordHeading">Reset Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="inputGroup">
              <LockOpenIcon className="inputIcon" />
              <input
                type="password"
                name="password"
                placeholder="New Password"
                value={passwords.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="inputGroup">
              <LockIcon className="inputIcon" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={passwords.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submitButton">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
