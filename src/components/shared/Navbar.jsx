import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <nav className="bg-red-700 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <span className="text-2xl">🩸</span>
                    <span className="text-xl font-bold tracking-wide">BloodBridge</span>
                </Link>

                {/* Nav Links */}
                <div className="flex items-center gap-6">
                    <Link to="/donation-requests" className="hover:text-red-200 transition">
                        Donation Requests
                    </Link>
                    {user && (
                        <Link to="/funding" className="hover:text-red-200 transition">
                            Funding
                        </Link>
                    )}

                    {!user ? (
                        <Link
                            to="/login"
                            className="bg-white text-red-700 px-4 py-1.5 rounded-full font-semibold hover:bg-red-100 transition"
                        >
                            Login
                        </Link>
                    ) : (
                        <div className="relative">
                            <img
                                src={user.photoURL || "https://i.ibb.co/placeholder.png"}
                                alt="avatar"
                                className="w-10 h-10 rounded-full cursor-pointer border-2 border-white object-cover"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            />
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-xl z-50">
                                    <Link
                                        to="/dashboard"
                                        className="block px-4 py-2 hover:bg-red-50 transition"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 hover:bg-red-50 transition text-red-600"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;