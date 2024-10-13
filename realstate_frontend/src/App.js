import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import Credentials from "./pages/Credentials"; // Import the new page;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/credentials" element={<Credentials />} />
      </Routes>
    </Router>
  );
}

export default App;
