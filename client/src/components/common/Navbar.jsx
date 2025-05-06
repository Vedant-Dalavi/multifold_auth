import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const isAuthenticated = localStorage.getItem("accessToken") !== null;

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold text-blue-600 transition duration-300 hover:text-blue-800">
                    AuthApp
                </Link>

                <div className="md:hidden">
                    <button
                        className="text-gray-700 focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        ☰
                    </button>
                </div>

                <div className={`md:flex gap-6 items-center ${isOpen ? "block" : "hidden"} md:block`}>
                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/dashboard"
                                className="text-gray-700 hover:text-blue-600 transition duration-300"
                            >
                                Dashboard
                            </Link>
                            <button
                                // onClick={handleLogout}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-gray-700 hover:text-blue-600 transition duration-300"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
