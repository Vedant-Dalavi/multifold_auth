import { useEffect, useState } from "react";
import axios from "axios";
import ErrorAlert from "./common/ErrorAlert";

const Dashboard = () => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [tokenStatus, setTokenStatus] = useState("");
    const [userData, setUserData] = useState(null);

    const logout = () => {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
    };

    const checkTokenValidity = async () => {
        setError("");
        setTokenStatus("");
        try {
            const token = localStorage.getItem("accessToken");
            const res = await axios.get("http://localhost:5000/api/v1/auth/protected", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTokenStatus("✅ Access token is valid.");
            setUserData(res.data.message)
        } catch (err) {
            setTokenStatus("⚠️ Access token is expired or invalid. ", err.message);
        }
    };

    const refreshAccessToken = async () => {
        setError("");
        try {
            console.log("Refreshing access token...");
            const res = await axios.get("http://localhost:5000/api/v1/auth/refresh", { withCredentials: true });
            console.log("Response:", res.data); // Debugging line
            const newAccessToken = res.data.accessToken;
            localStorage.setItem("accessToken", newAccessToken);
            setTokenStatus("🔁 Access token refreshed successfully.");
        } catch (err) {
            setTokenStatus("❌ Refresh token expired. Logging out.", err.message);
            // logout();
        }
    };

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const res = await axios.get("/dashboard", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMessage(res.data.message);
            } catch (err) {
                setError("Failed to fetch dashboard data.", err.message);
            }
        };
        fetchDashboard();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl w-full">
                <h2 className="text-3xl font-bold text-blue-600 mb-4">Dashboard</h2>
                <p>{userData}</p>

                <ErrorAlert message={error} />

                {message && (
                    <p className="text-gray-700 text-lg mb-4 transition duration-200">{message}</p>
                )}

                {tokenStatus && (
                    <p className="text-yellow-700 text-sm font-medium mb-4 transition duration-200">
                        {tokenStatus}
                    </p>
                )}

                <div className="flex flex-col gap-4 mb-6">
                    <button
                        onClick={checkTokenValidity}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                        Check Access Token
                    </button>

                    <button
                        onClick={refreshAccessToken}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    >
                        Refresh Access Token
                    </button>
                </div>

                <button
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
