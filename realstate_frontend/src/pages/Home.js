import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../cssFiles/Home.css"; // Include CSS for styling
import axios from "axios"; // Import axios for making API calls

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // Hook to programmatically navigate

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      // Call the logout endpoint using refresh_token
      const refreshToken = localStorage.getItem("refresh_token");
      await axios.post("http://localhost:8000/api/logout/", {
        refresh: refreshToken, // Send refresh token in the request body
      });

      // Clear the tokens from local storage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      // Navigate to login or any other page after logout
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally handle errors (e.g., show a message to the user)
    }
  };

  return (
    <div className="home-container">
      {/* Circular menu button */}
      <div className="circle-menu" onClick={toggleMenu}>
        &#9776; {/* Hamburger icon */}
      </div>

      {/* Dropdown menu */}
      {menuOpen && (
        <div className="dropdown-menu">
          <Link to="/profile" onClick={() => setMenuOpen(false)}>
            Profile
          </Link>
          <Link to="/credentials" onClick={() => setMenuOpen(false)}>
            Credentials
          </Link>
          <button
            className="logout-button"
            onClick={() => {
              handleLogout();
              setMenuOpen(false); // Close menu after clicking logout
            }}
          >
            Logout
          </button>
        </div>
      )}

      {/* Sections */}
      <div className="sections">
        <div className="section" id="for-rent">
          <h2>For Rent</h2>
          {/* Content for For Rent section */}
        </div>
        <div className="section" id="to-buy">
          <h2>To Buy</h2>
          {/* Content for To Buy section */}
        </div>
        <div className="section" id="another-section">
          <h2>Another Section</h2>
          {/* Content for Another section */}
        </div>
      </div>
    </div>
  );
};

export default Home;
