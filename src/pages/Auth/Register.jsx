import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import districtData from "../../utils/districts.json";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Register = () => {
    const { register, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [upazilas, setUpazilas] = useState([]);

    const handleDistrictChange = (e) => {
        const districtName = e.target.value;
        setSelectedDistrict(districtName);
        const found = districtData.find((d) => d.name === districtName);
        setUpazilas(found ? found.upazilas : []);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        const avatar = form.avatar.files[0];
        const bloodGroup = form.bloodGroup.value;
        const district = form.district.value;
        const upazila = form.upazila.value;

        if (password !== confirmPassword) {
            return toast.error("Passwords do not match!");
        }

        if (password.length < 6) {
            return toast.error("Password must be at least 6 characters!");
        }

        try {
            setLoading(true);

            // Upload avatar to imgbb
            const formData = new FormData();
            formData.append("image", avatar);
            const imgRes = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                formData
            );
            const avatarUrl = imgRes.data.data.url;

            // Firebase register
            const result = await register(email, password);
            await updateUserProfile(name, avatarUrl);

            // Save user to DB
            await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
                name,
                email,
                avatar: avatarUrl,
                bloodGroup,
                district,
                upazila,
                role: "donor",
                status: "active",
            });

            toast.success("Registration successful!");
            navigate("/");
        } catch (error) {
            toast.error(error.message || "Registration failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 flex items-center justify-center px-4 py-10">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="text-5xl mb-3">🩸</div>
                    <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
                    <p className="text-gray-500 mt-1">Join BloodBridge as a donor</p>
                </div>

                {/* Form */}
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Enter your full name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Avatar</label>
                        <input
                            type="file"
                            name="avatar"
                            required
                            accept="image/*"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                        <select
                            name="bloodGroup"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-400"
                        >
                            <option value="">Select blood group</option>
                            {bloodGroups.map((bg) => (
                                <option key={bg} value={bg}>{bg}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                        <select
                            name="district"
                            required
                            onChange={handleDistrictChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-400"
                        >
                            <option value="">Select district</option>
                            {districtData.map((d) => (
                                <option key={d.name} value={d.name}>{d.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Upazila</label>
                        <select
                            name="upazila"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-400"
                        >
                            <option value="">Select upazila</option>
                            {upazilas.map((u) => (
                                <option key={u} value={u}>{u}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="Enter password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            placeholder="Confirm your password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 text-white py-2.5 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-60"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <p className="text-center text-gray-500 mt-6 text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-red-600 font-semibold hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;