import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axiosSecure from "../../utils/axiosSecure";
import toast from "react-hot-toast";
import districtData from "../../utils/districts.json";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Profile = () => {
    const { user, updateUserProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [upazilas, setUpazilas] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        bloodGroup: "",
        district: "",
        upazila: "",
    });

    useEffect(() => {
        if (user?.email) {
            axiosSecure
                .get(`/users/${user.email}`)
                .then((res) => {
                    const data = res.data;
                    setFormData({
                        name: data?.name || user?.displayName || "",
                        bloodGroup: data?.bloodGroup || "",
                        district: data?.district || "",
                        upazila: data?.upazila || "",
                    });
                    const found = districtData.find((d) => d.name === data?.district);
                    setUpazilas(found ? found.upazilas : []);
                })
                .catch(() => { });
        }
    }, [user]);

    const handleDistrictChange = (e) => {
        const district = e.target.value;
        setFormData({ ...formData, district, upazila: "" });
        const found = districtData.find((d) => d.name === district);
        setUpazilas(found ? found.upazilas : []);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await updateUserProfile(formData.name, user.photoURL);
            await axiosSecure.patch(`/users/${user.email}`, formData);
            toast.success("Profile updated successfully!");
            setIsEditing(false);
        } catch {
            toast.error("Failed to update profile!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                        Edit Profile
                    </button>
                )}
            </div>

            <div className="flex justify-center mb-6">
                <img
                    src={user?.photoURL || "https://i.ibb.co/0jq8H5B/avatar.png"}
                    alt="avatar"
                    className="w-24 h-24 rounded-full object-cover border-4 border-red-400"
                />
            </div>

            <form onSubmit={handleSave} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={!isEditing}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                        type="email"
                        value={user?.email || ""}
                        disabled
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-gray-100 cursor-not-allowed"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                    <select
                        value={formData.bloodGroup}
                        onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                        disabled={!isEditing}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
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
                        value={formData.district}
                        onChange={handleDistrictChange}
                        disabled={!isEditing}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
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
                        value={formData.upazila}
                        onChange={(e) => setFormData({ ...formData, upazila: e.target.value })}
                        disabled={!isEditing}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-100"
                    >
                        <option value="">Select upazila</option>
                        {upazilas.map((u) => (
                            <option key={u} value={u}>{u}</option>
                        ))}
                    </select>
                </div>

                {isEditing && (
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-red-600 text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition disabled:opacity-60"
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Profile;