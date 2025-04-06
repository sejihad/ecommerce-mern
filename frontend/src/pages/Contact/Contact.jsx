import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import EmailIcon from "@mui/icons-material/Email";
import { Button } from "@mui/material";
import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-content">
        <h1 className="contact-title">Get In Touch</h1>
        <p className="contact-subtitle">
          Have questions or want to work together?
        </p>

        <div className="contact-options">
          <a href="mailto:ijihad639@gmail.com" className="contact-email-btn">
            <Button
              variant="contained"
              size="large"
              startIcon={<EmailIcon />}
              endIcon={<ArrowRightAltIcon />}
              className="email-button"
            >
              Send an Email
            </Button>
          </a>

          <div className="contact-info">
            <p className="contact-text">
              Or reach out directly at: <strong>ijihad639@gmail.com</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
