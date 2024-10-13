// src/pages/Credentials.js

import React from "react";

const Credentials = () => {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  return (
    <div>
      <h1>Your Tokens</h1>
      <div>
        <h2>Access Token:</h2>
        <pre>{accessToken}</pre>
      </div>
      <div>
        <h2>Refresh Token:</h2>
        <pre>{refreshToken}</pre>
      </div>
    </div>
  );
};

export default Credentials;
