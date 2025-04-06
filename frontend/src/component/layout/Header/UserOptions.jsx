import {
  Dashboard as DashboardIcon,
  ExitToApp as ExitToAppIcon,
  ListAlt as ListAltIcon,
  Person as PersonIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import {
  Backdrop,
  Badge,
  SpeedDial,
  SpeedDialAction,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../../actions/userAction";
import "./Header.css";

const UserOptions = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { cartItems } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);

  const userActions = [
    {
      icon: <ListAltIcon />,
      name: "Orders",
      func: () => navigate("/orders"),
    },
    {
      icon: <PersonIcon />,
      name: "Profile",
      func: () => navigate("/account"),
    },
    {
      icon: (
        <Badge badgeContent={cartItems.length} color="error" overlap="circular">
          <ShoppingCartIcon
            color={cartItems.length > 0 ? "error" : "inherit"}
          />
        </Badge>
      ),
      name: `Cart (${cartItems.length})`,
      func: () => navigate("/cart"),
    },
    {
      icon: <ExitToAppIcon />,
      name: "Logout",
      func: handleLogout,
    },
  ];

  if (user.role === "admin") {
    userActions.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: () => navigate("/admin/dashboard"),
    });
  }

  function handleLogout() {
    dispatch(logout());
    toast.success("Logout Successfully");
    navigate("/login");
  }

  return (
    <>
      <Backdrop
        open={open}
        sx={{
          zIndex: (theme) => theme.zIndex.speedDial - 1,
          backgroundColor: "rgba(0,0,0,0.1)",
        }}
      />

      <SpeedDial
        ariaLabel="User actions"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction={isMobile ? "up" : "up"}
        sx={{
          position: "fixed",
          bottom: 16,

          right: 16,
          zIndex: (theme) => theme.zIndex.speedDial,
          "& .MuiSpeedDial-fab": {
            width: 56,
            height: 56,
          },
        }}
        icon={
          <img
            className="speedDialIcon"
            src={user?.avatar?.url || "/Profile.png"}
            alt="Profile"
            onError={(e) => {
              e.target.src = "/Profile.png";
            }}
          />
        }
      >
        {userActions.map((action, index) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.func}
            tooltipOpen={isMobile || open}
            sx={{
              "& .MuiSpeedDialAction-staticTooltipLabel": {
                whiteSpace: "nowrap",
              },
            }}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
