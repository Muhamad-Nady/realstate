import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Credentials from "./pages/Credentials"; // Import the new page;
import UserProfile from "./pages/UserProfile"; // Adjust the path as necessary
import Home from "./pages/Home"; // Import the Home component
import PropertyDetails from "./pages/PropertyDetails"; // Import the new component
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Add Home route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/credentials" element={<Credentials />} />
        <Route path="/profile" element={<UserProfile />} />{" "}
        <Route path="/properties/:id" element={<PropertyDetails />} />{" "}
        {/* New Route */}
        {/* Add UserProfile route */}
      </Routes>
    </Router>
  );
}

export default App;
