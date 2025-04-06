import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <ErrorOutlineIcon className="error-icon" />

        <Typography variant="h3" className="title">
          404 - Page Not Found
        </Typography>

        <Typography variant="subtitle1" className="message">
          The page you're looking for doesn't exist or has been moved
        </Typography>

        <Button
          component={Link}
          to="/"
          variant="contained"
          className="home-button"
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
