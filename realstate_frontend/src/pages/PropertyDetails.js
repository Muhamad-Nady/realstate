// src/pages/PropertyDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar"; // Import Navbar
import "../cssFiles/PropertyDetails.css"; // Import the CSS file

const PropertyDetails = () => {
  const { id } = useParams(); // Get the property ID from the URL
  const [property, setProperty] = useState(null); // State to hold property data
  const [loading, setLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    // Fetch the property details based on the ID
    const fetchProperty = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/properties/${id}/`
        );
        setProperty(response.data); // Set the data in state
      } catch (error) {
        console.error("Error fetching property details:", error);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) return <p>Loading property details...</p>;
  if (!property) return <p>Property not found.</p>;

  return (
    <div className="property-details">
      <Navbar /> {/* Navbar Component */}
      {/* Display Single Image */}
      {property.image && (
        <div className="property-image-container">
          <img
            src={property.image} // Use the single image URL from the property data
            alt={property.title}
            className="property-image"
          />
        </div>
      )}
      {/* Property Details Table */}
      <h1>{property.title}</h1>
      <table className="property-table">
        <tbody>
          <tr>
            <th>Location</th>
            <td>{property.location}</td>
          </tr>
          <tr>
            <th>Bedrooms</th>
            <td>{property.bedrooms}</td>
          </tr>
          <tr>
            <th>Bathrooms</th>
            <td>{property.bathrooms}</td>
          </tr>
          <tr>
            <th>Price</th>
            <td>${property.price}</td>
          </tr>
          <tr>
            <th>Square Footage</th>
            <td>{property.square_footage} sq ft</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{property.description}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PropertyDetails;
