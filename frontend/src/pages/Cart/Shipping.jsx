import {
  Home,
  LocationCity,
  Phone,
  PinDrop,
  Public,
  TransferWithinAStation,
} from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Country, State } from "country-state-city";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../../component/layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import "./Shipping.css";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo?.address || "");
  const [city, setCity] = useState(shippingInfo?.city || "");
  const [state, setState] = useState(shippingInfo?.state || "");
  const [country, setCountry] = useState(shippingInfo?.country || "");
  const [pinCode, setPinCode] = useState(shippingInfo?.pinCode || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo || "");

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 11) {
      toast.error("Phone Number should be 10 or 11 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };

  return (
    <>
      <MetaData title="Shipping Details" />
      <CheckoutSteps activeStep={0} />

      <Box className="shipping-container">
        <Paper elevation={3} className="shipping-box">
          <Typography variant="h4" className="shipping-heading">
            Shipping Details
          </Typography>

          <form onSubmit={shippingSubmit} className="shipping-form">
            <TextField
              fullWidth
              label="Address"
              variant="outlined"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Home />
                  </InputAdornment>
                ),
              }}
              className="shipping-field"
            />

            <TextField
              fullWidth
              label="City"
              variant="outlined"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationCity />
                  </InputAdornment>
                ),
              }}
              className="shipping-field"
            />

            <TextField
              fullWidth
              label="Pin Code"
              variant="outlined"
              type="number"
              required
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PinDrop />
                  </InputAdornment>
                ),
              }}
              className="shipping-field"
            />

            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              type="number"
              required
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              inputProps={{ maxLength: 11 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                ),
              }}
              className="shipping-field"
            />

            <FormControl fullWidth className="shipping-field">
              <InputAdornment position="start">
                <Public />
              </InputAdornment>
              <Select
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setState("");
                }}
                displayEmpty
                required
                renderValue={(selected) => {
                  if (!selected) {
                    return "Select Country";
                  }
                  return Country.getCountryByCode(selected)?.name;
                }}
              >
                <MenuItem value="" disabled>
                  Select Country
                </MenuItem>
                {Country.getAllCountries().map((item) => (
                  <MenuItem key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {country && (
              <FormControl fullWidth className="shipping-field">
                <InputAdornment position="start">
                  <TransferWithinAStation />
                </InputAdornment>
                <Select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  displayEmpty
                  required
                  renderValue={(selected) => {
                    if (!selected) {
                      return "Select State";
                    }
                    return State.getStatesOfCountry(country).find(
                      (s) => s.isoCode === selected
                    )?.name;
                  }}
                >
                  <MenuItem value="" disabled>
                    Select State
                  </MenuItem>
                  {State.getStatesOfCountry(country).map((item) => (
                    <MenuItem key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="shipping-btn"
              disabled={!state}
            >
              Continue to Payment
            </Button>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default Shipping;
