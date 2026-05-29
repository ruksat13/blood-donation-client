import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

const Sidebar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [role, setRole] = useState("donor");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (user?.email) {
            axios
                .get(`${import.meta.env.VITE_API_URL}/users/role/${user.email}`)
                .then((res) => setRole(res.data.role))
                .catch(() => setRole("donor"));
        }
    }, [user]);

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    const linkClass = ({ isActive }) =>
        `block px-4 py-2 rounded-lg transition ${isActive
            ? "bg-red-600 text-white font-semibold"
            : "text-gray-700 hover:bg-red-50 hover:text-red-600"
        }`;

    const donorLinks = (
        <>
            <NavLink to="/dashboard" end className={linkClass}>🏠 Dashboard</NavLink>
            <NavLink to="/dashboard/my-donation-requests" className={linkClass}>🩸 My Donation Requests</NavLink>
            <NavLink to="/dashboard/create-donation-request" className={linkClass}>🆕 Create Request</NavLink>
            <NavLink to="/dashboard/profile" className={linkClass}>👤 Profile</NavLink>
        </>
    );

    const adminLinks = (
        <>
            <NavLink to="/dashboard" end className={linkClass}>🏠 Dashboard</NavLink>
            <NavLink to="/dashboard/all-users" className={linkClass}>👥 All Users</NavLink>
            <NavLink to="/dashboard/all-blood-donation-request" className={linkClass}>🩸 All Donation Requests</NavLink>
            <NavLink to="/dashboard/profile" className={linkClass}>👤 Profile</NavLink>
            <NavLink to="/dashboard/profile" className={linkClass}>👤 Profile</NavLink>
        </>
    );

    const volunteerLinks = (
        <>
            <NavLink to="/dashboard" end className={linkClass}>🏠 Dashboard</NavLink>
            <NavLink to="/dashboard/all-blood-donation-request" className={linkClass}>🩸 All Donation Requests</NavLink>
            <NavLink to="/dashboard/profile" className={linkClass}>👤 Profile</NavLink>
        </>
    );

    return (
        <>
            {/* Mobile Toggle */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 bg-red-600 text-white p-2 rounded-lg"
                onClick={() => setIsOpen(!isOpen)}
            >
                ☰
            </button>

            {/* Sidebar */}
            <div
                className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-xl z-40 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                    }`}
            >
                {/* Logo */}
                <div className="bg-red-700 text-white p-4 flex items-center gap-2">
                    <span className="text-2xl">🩸</span>
                    <span className="text-lg font-bold">BloodBridge</span>
                </div>

                {/* User Info */}
                <div className="p-4 border-b flex items-center gap-3">
                    <img
                        src={user?.photoURL || "https://i.ibb.co/placeholder.png"}
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover border-2 border-red-400"
                    />
                    <div>
                        <p className="font-semibold text-sm text-gray-800">{user?.displayName}</p>
                        <p className="text-xs text-gray-500 capitalize">{role}</p>
                    </div>
                </div>

                {/* Links */}
                <nav className="p-4 space-y-1">
                    {role === "admin" && adminLinks}
                    {role === "volunteer" && volunteerLinks}
                    {role === "donor" && donorLinks}
                </nav>

                {/* Logout */}
                <div className="absolute bottom-0 w-full p-4 border-t">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;