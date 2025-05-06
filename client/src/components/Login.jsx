import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import ErrorAlert from "./common/ErrorAlert";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Form data:", form); // Debugging line
        // setError("");
        try {
            const res = await axios.post("http://localhost:5000/api/v1/auth/login", form, { withCredentials: true });
            localStorage.setItem("accessToken", res.data.accessToken);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <form onSubmit={handleLogin} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-blue-600 mb-6">Login</h2>

                <ErrorAlert message={error} />

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
                >
                    Login
                </button>

                <p className="mt-4 text-sm text-center text-gray-600">
                    Not registered yet?{" "}
                    <Link to="/register" className="text-blue-600 hover:text-blue-800 transition">
                        Register here
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
