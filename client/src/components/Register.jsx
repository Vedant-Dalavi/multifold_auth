// src/components/Register.js
import { useState } from "react";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import ErrorAlert from "./common/ErrorAlert";

function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await axios.post("http://localhost:5000/api/v1/auth/register", form);
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-white to-blue-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md transition-all duration-300 hover:shadow-2xl"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Register</h2>
                <ErrorAlert message={error} />

                <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <p className="mt-4 text-sm text-center text-gray-600">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-blue-600 hover:text-blue-800 font-medium transition duration-200"
                    >
                        Login here
                    </Link>
                </p>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                >

                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;
