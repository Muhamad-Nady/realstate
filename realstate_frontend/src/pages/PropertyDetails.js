// pages/PropertyDetails.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
      <h1>{property.title}</h1>
      <img
        src={property.image}
        alt={property.title}
        className="property-image"
      />
      <p>
        <strong>Location:</strong> {property.location}
      </p>
      <p>
        <strong>Bedrooms:</strong> {property.bedrooms}
      </p>
      <p>
        <strong>Bathrooms:</strong> {property.bathrooms}
      </p>
      <p>
        <strong>Price:</strong> ${property.price}
      </p>
      <p>
        <strong>Square Footage:</strong> {property.square_footage} sq ft
      </p>
      <p>
        <strong>Description:</strong> {property.description}
      </p>
    </div>
  );
};

export default PropertyDetails;
