// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "../cssFiles/Navbar.css"; // You can create a custom CSS file to style the navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <Link to="/" className="navbar-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="navbar-link">
            About
          </Link>
        </li>
        <li>
          <Link to="/search" className="navbar-link">
            Search
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
