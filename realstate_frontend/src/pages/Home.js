import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../cssFiles/Home.css";
import axios from "axios";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [forRentProperties, setForRentProperties] = useState([]);
  const [toBuyProperties, setToBuyProperties] = useState([]);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Fetch properties for each section on component mount
  useEffect(() => {
    const fetchForRentProperties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/properties/",
          {
            params: { category: "rent" }, // Assuming properties have a category field
          }
        );
        setForRentProperties(response.data);
      } catch (error) {
        console.error("Error fetching for rent properties:", error);
      }
    };

    const fetchToBuyProperties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/properties/",
          {
            params: { category: "buy" }, // Assuming properties have a category field
          }
        );
        setToBuyProperties(response.data);
      } catch (error) {
        console.error("Error fetching to buy properties:", error);
      }
    };

    fetchForRentProperties();
    fetchToBuyProperties();
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

      <div className="sections">
        {/* For Rent Section */}
        <div className="section" id="for-rent">
          <h2>For Rent</h2>
          {forRentProperties.length > 0 ? (
            forRentProperties.map((property) => (
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
            <p>No properties available for rent.</p>
          )}
        </div>

        {/* To Buy Section */}
        <div className="section" id="to-buy">
          <h2>To Buy</h2>
          {toBuyProperties.length > 0 ? (
            toBuyProperties.map((property) => (
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
            <p>No properties available to buy.</p>
          )}
        </div>

        {/* Placeholder for Another Section */}
        <div className="section" id="another-section">
          <h2>Another Section</h2>
          <p>Content for another section</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
