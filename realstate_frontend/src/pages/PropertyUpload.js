// src/pages/PropertyUpload.js
import React, { useState } from "react";
import { uploadProperty } from "../api";
import "../cssFiles/PropertyUpload.css"; // Import the CSS file
import Navbar from "../components/Navbar"; // Import the Navbar component

const PropertyUpload = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    price: "",
    square_footage: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    const response = await uploadProperty(data);
    if (response) {
      alert("Property uploaded successfully!");
      setFormData({
        title: "",
        description: "",
        location: "",
        bedrooms: "",
        bathrooms: "",
        price: "",
        square_footage: "",
        image: null,
      });
    }
  };

  return (
    <div>
      <div className="navbar-container">
        <Navbar /> {/* Ensure Navbar is centered */}
      </div>
      <div className="property-upload-container">
        <form onSubmit={handleSubmit} className="property-upload-form">
          <h2>Upload Property</h2>

          <div className="form-group">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              required
            />
          </div>

          <div className="form-group">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              required
            />
          </div>

          <div className="form-group">
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              placeholder="Bedrooms"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              placeholder="Bathrooms"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              name="square_footage"
              value={formData.square_footage}
              onChange={handleChange}
              placeholder="Square Footage"
              required
            />
          </div>

          <div className="form-group">
            <input type="file" name="image" onChange={handleChange} />
          </div>

          <button type="submit">Upload Property</button>
        </form>
      </div>
    </div>
  );
};

export default PropertyUpload;
