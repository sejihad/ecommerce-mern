import React, { useState } from "react";
import {
  FaBars,
  FaSearch,
  FaShoppingCart,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../../images/logo.png";
import "./Header.css";
import UserOptions from "./UserOptions";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo-img" />
          </Link>
        </div>

        {/* All navigation items - shown only when menu is open */}
        <ul className={`nav-links ${isOpen ? "active" : ""}`}>
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" onClick={() => setIsOpen(false)}>
              Products
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setIsOpen(false)}>
              About
            </Link>
          </li>
          <li className="nav-icons">
            <Link to="/search" onClick={() => setIsOpen(false)}>
              <FaSearch />
            </Link>
            <Link to="/cart" onClick={() => setIsOpen(false)}>
              <FaShoppingCart />
            </Link>
            {!isAuthenticated && (
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <FaUser />
              </Link>
            )}
          </li>
        </ul>

        {/* UserOptions - visible by default when authenticated */}
        {isAuthenticated && <UserOptions user={user} />}

        {/* Hamburger Menu Button - always visible */}
        <div className="hamburger" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </nav>
    </header>
  );
};

export default Header;
