import {
  LibraryAddCheck as ConfirmIcon,
  AccountBalance as PaymentIcon,
  LocalShipping as ShippingIcon,
} from "@mui/icons-material";
import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import React from "react";
import "./CheckoutSteps.css";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: "Shipping",
      icon: <ShippingIcon />,
    },
    {
      label: "Confirm",
      icon: <ConfirmIcon />,
    },
    {
      label: "Payment",
      icon: <PaymentIcon />,
    },
  ];

  return (
    <div className="checkout-steps">
      <Stepper activeStep={activeStep} alternativeLabel className="stepper">
        {steps.map((step, index) => (
          <Step
            key={step.label}
            className={`step ${activeStep >= index ? "active" : ""}`}
          >
            <StepLabel
              StepIconComponent={() => (
                <div
                  className={`step-icon ${activeStep >= index ? "active" : ""}`}
                >
                  {step.icon}
                </div>
              )}
              className="step-label"
            >
              <Typography
                variant="caption"
                className={`step-text ${activeStep >= index ? "active" : ""}`}
              >
                {step.label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default CheckoutSteps;
