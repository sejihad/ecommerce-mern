import { AccountCircle, CameraAlt, Email, LockOpen } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  InputAdornment,
  Paper,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, login, register } from "../../actions/userAction";
import Loader from "../../component/layout/Loader/Loader";
import "./LoginSignUp.css";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [activeTab, setActiveTab] = useState(0);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    if (avatar) {
      myForm.set("avatar", avatar);
    }
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      } else {
        setAvatarPreview("/Profile.png");
        setAvatar(null);
      }
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [isAuthenticated, navigate, redirect]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="auth-container">
          <Paper elevation={3} className="auth-card">
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="fullWidth"
              className="auth-tabs"
            >
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>

            {activeTab === 0 ? (
              <form onSubmit={loginSubmit} className="auth-form">
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                  className="auth-input"
                />

                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOpen />
                      </InputAdornment>
                    ),
                  }}
                  className="auth-input"
                />

                <Box className="forgot-password">
                  <Link to="/password/forgot">Forgot Password?</Link>
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  className="auth-button"
                >
                  Login
                </Button>
              </form>
            ) : (
              <form
                onSubmit={registerSubmit}
                className="auth-form"
                encType="multipart/form-data"
              >
                <Box className="avatar-upload">
                  <label htmlFor="avatar-upload">
                    <Avatar
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className="avatar-preview"
                    />
                    <CameraAlt className="camera-icon" />
                  </label>
                  <input
                    type="file"
                    id="avatar-upload"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                    hidden
                  />
                </Box>

                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  required
                  name="name"
                  value={name}
                  onChange={registerDataChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  className="auth-input"
                />

                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  type="email"
                  required
                  name="email"
                  value={email}
                  onChange={registerDataChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                  className="auth-input"
                />

                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  required
                  name="password"
                  value={password}
                  onChange={registerDataChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOpen />
                      </InputAdornment>
                    ),
                  }}
                  className="auth-input"
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  className="auth-button"
                >
                  Register
                </Button>
              </form>
            )}
          </Paper>
        </div>
      )}
    </>
  );
};

export default LoginSignUp;
