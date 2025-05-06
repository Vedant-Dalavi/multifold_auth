// src/App.js
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/common/Navbar";

function App() {
  const [accessToken, setAccessToken] = useState("");

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setAccessToken={setAccessToken} />} />
        <Route
          path="/"
          element={
            <ProtectedRoute >
              <Dashboard accessToken={accessToken} setAccessToken={setAccessToken} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
