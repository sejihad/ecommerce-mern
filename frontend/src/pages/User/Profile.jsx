import { Avatar, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../component/layout/Loader/Loader";
import MetaData from "../../component/layout/MetaData";
import "./Profile.css";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  if (loading) return <Loader />;

  return (
    <>
      <MetaData title={`${user.name}'s Profile`} />
      <div className="profile-container">
        <div className="profile-sidebar">
          <Typography variant="h4" className="profile-title">
            My Profile
          </Typography>
          <Avatar
            src={user.avatar.url}
            alt={user.name}
            className="profile-avatar"
          />
          <Button
            component={Link}
            to="/me/update"
            variant="contained"
            className="edit-profile-btn"
          >
            Edit Profile
          </Button>
        </div>

        <div className="profile-details">
          <div className="detail-section">
            <Typography variant="subtitle1" className="detail-label">
              Full Name
            </Typography>
            <Typography variant="body1" className="detail-value">
              {user.name}
            </Typography>
          </div>

          <div className="detail-section">
            <Typography variant="subtitle1" className="detail-label">
              Email
            </Typography>
            <Typography variant="body1" className="detail-value">
              {user.email}
            </Typography>
          </div>

          <div className="detail-section">
            <Typography variant="subtitle1" className="detail-label">
              Joined On
            </Typography>
            <Typography variant="body1" className="detail-value">
              {new Date(user.createdAt).toLocaleDateString()}
            </Typography>
          </div>

          <div className="profile-actions">
            <Button
              component={Link}
              to="/orders"
              variant="outlined"
              className="action-btn"
            >
              My Orders
            </Button>
            <Button
              component={Link}
              to="/password/update"
              variant="outlined"
              className="action-btn"
            >
              Change Password
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
