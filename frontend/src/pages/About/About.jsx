import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Avatar, Button, Typography } from "@mui/material";
import React from "react";
import "./AboutSection.css";

const About = () => {
  const visitWebsite = () => {
    window.open("https://sejihad.vercel.app", "_blank");
  };

  return (
    <section className="about-section">
      <div className="about-content">
        <div className="about-header">
          <Typography variant="h2" className="about-title">
            About Me
          </Typography>
          <Typography variant="subtitle1" className="about-subtitle">
            Full Stack Developer
          </Typography>
        </div>

        <div className="about-profile">
          <Avatar className="profile-avatar" src="/jihad.png" alt="SE Jihad" />
          <Typography variant="h5" className="profile-name">
            SE Jihad
          </Typography>
          <Typography variant="body1" className="profile-bio">
            I'm a Full Stack Web Developer focused on creating clean, error-free
            websites that deliver a seamless user experience. My attention to
            detail ensures that every project meets high standards.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            className="website-button"
            onClick={visitWebsite}
            startIcon={<EmailIcon />}
          >
            Visit My Portfolio
          </Button>

          <div className="social-links">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <LinkedInIcon className="social-icon linkedin" />
            </a>
            <a
              href="https://github.com/sejihad"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon className="social-icon github" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
