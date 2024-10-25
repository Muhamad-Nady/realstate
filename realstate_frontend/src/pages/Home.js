import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../cssFiles/Home.css"; // Optional: Include CSS for styling

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
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
