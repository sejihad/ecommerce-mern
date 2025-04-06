import { Email } from "@mui/icons-material";
import { Button, Paper, TextField, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import Loader from "../../component/layout/Loader/Loader";
import MetaData from "../../component/layout/MetaData";
import "./ForgotPassword.css";
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, message]);

  return (
    <>
      <MetaData title="Forgot Password" />
      {loading ? (
        <Loader />
      ) : (
        <div className="forgot-password-container">
          <Paper elevation={3} className="forgot-password-card">
            <Typography variant="h4" className="forgot-password-title">
              Forgot Password
            </Typography>
            <Typography variant="body1" className="forgot-password-subtitle">
              Enter your email to receive a password reset link
            </Typography>

            <form
              onSubmit={forgotPasswordSubmit}
              className="forgot-password-form"
            >
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
                className="email-input"
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="submit-button"
              >
                Send Reset Link
              </Button>
            </form>

            <Typography variant="body2" className="login-link">
              Remember your password? <a href="/login">Login here</a>
            </Typography>
          </Paper>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
