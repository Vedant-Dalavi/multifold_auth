// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    // console.log("Access Token:", accessToken); // Debugging line
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return <Navigate to="/login" />;
    return children;
}

export default ProtectedRoute;
