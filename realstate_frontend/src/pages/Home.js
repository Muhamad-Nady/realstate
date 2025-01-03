import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../cssFiles/Home.css";
import axios from "axios";
import Navbar from "../components/Navbar"; // Import Navbar

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [allProperties, setAllProperties] = useState([]);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Fetch all properties on component mount
  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/properties/"
        );
        setAllProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchAllProperties();
  }, []);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      await axios.post("http://localhost:8000/api/logout/", {
        refresh: refreshToken,
      });

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="home-container">
      {/* Widget for Property Upload */}
      <div className="upload-widget">
        <Link to="/upload">
          <button className="upload-button">Upload Property</button>
        </Link>
      </div>

      <div className="circle-menu" onClick={toggleMenu}>
        &#9776;
      </div>

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
              setMenuOpen(false);
            }}
          >
            Logout
          </button>
        </div>
      )}

      <div className="properties-list">
        <h2>All Available Units</h2>
        <div className="properties-grid">
          {allProperties.length > 0 ? (
            allProperties.map((property) => (
              <div key={property.id} className="property-card">
                <img
                  src={property.image}
                  alt={property.title}
                  className="property-image"
                />
                <h3>{property.title}</h3>
                <p>{property.location}</p>
                <p>Price: ${property.price}</p>
                <Link to={`/properties/${property.id}`}>View Details</Link>
              </div>
            ))
          ) : (
            <p>No properties available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
