import { useAuth } from "../../../contexts/AuthContext";
import axiosSecure from "../../../utils/axiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import districtData from "../../../utils/districts.json";
import { useState } from "react";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const CreateDonationRequest = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [upazilas, setUpazilas] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleDistrictChange = (e) => {
        const found = districtData.find((d) => d.name === e.target.value);
        setUpazilas(found ? found.upazilas : []);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const donationRequest = {
            requesterName: user.displayName,
            requesterEmail: user.email,
            recipientName: form.recipientName.value,
            recipientDistrict: form.recipientDistrict.value,
            recipientUpazila: form.recipientUpazila.value,
            hospitalName: form.hospitalName.value,
            fullAddress: form.fullAddress.value,
            bloodGroup: form.bloodGroup.value,
            donationDate: form.donationDate.value,
            donationTime: form.donationTime.value,
            requestMessage: form.requestMessage.value,
            status: "pending",
        };

        try {
            setLoading(true);
            await axiosSecure.post(`${import.meta.env.VITE_API_URL}/donation-requests`, donationRequest);
            toast.success("Donation request created successfully!");
            navigate("/dashboard/my-donation-requests");
        } catch (error) {
            toast.error("Failed to create donation request!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Donation Request</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Requester Name</label>
                    <input
                        type="text"
                        value={user?.displayName}
                        readOnly
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-gray-100"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Requester Email</label>
                    <input
                        type="email"
                        value={user?.email}
                        readOnly
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-gray-100"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Name</label>
                    <input
                        type="text"
                        name="recipientName"
                        required
                        placeholder="Enter recipient name"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Recipient District</label>
                    <select
                        name="recipientDistrict"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Upazila</label>
                    <select
                        name="recipientUpazila"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Name</label>
                    <input
                        type="text"
                        name="hospitalName"
                        required
                        placeholder="Enter hospital name"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                    <input
                        type="text"
                        name="fullAddress"
                        required
                        placeholder="Enter full address"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-400"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Donation Date</label>
                    <input
                        type="date"
                        name="donationDate"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Donation Time</label>
                    <input
                        type="time"
                        name="donationTime"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Request Message</label>
                    <textarea
                        name="requestMessage"
                        required
                        rows="4"
                        placeholder="Why do you need blood? Explain in detail..."
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-400"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-600 text-white py-2.5 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-60"
                >
                    {loading ? "Creating..." : "Create Request"}
                </button>
            </form>
        </div>
    );
};

export default CreateDonationRequest;