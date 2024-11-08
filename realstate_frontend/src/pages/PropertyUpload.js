// src/pages/PropertyUpload.js
import React, { useState } from "react";
import { uploadProperty } from "../api";

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
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
        required
      />
      <input
        type="number"
        name="bedrooms"
        value={formData.bedrooms}
        onChange={handleChange}
        placeholder="Bedrooms"
        required
      />
      <input
        type="number"
        name="bathrooms"
        value={formData.bathrooms}
        onChange={handleChange}
        placeholder="Bathrooms"
        required
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <input
        type="number"
        name="square_footage"
        value={formData.square_footage}
        onChange={handleChange}
        placeholder="Square Footage"
        required
      />
      <input type="file" name="image" onChange={handleChange} />
      <button type="submit">Upload Property</button>
    </form>
  );
};

export default PropertyUpload;
