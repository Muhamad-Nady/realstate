// UserProfile.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar"; // Import Navbar

const UserProfile = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("access_token"); // Adjust according to your token storage logic
      try {
        const response = await axios.get(
          "http://localhost:8000/api/user/profile/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);
      } catch (err) {
        setError("Failed to fetch user profile");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token"); // Adjust according to your token storage logic
    try {
      await axios.put("http://localhost:8000/api/user/profile/", userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Profile updated successfully");
    } catch (err) {
      setError("Failed to update profile");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>User Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            readOnly
          />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={userData.email} readOnly />
        </div>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            value={userData.first_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            value={userData.last_name}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;
