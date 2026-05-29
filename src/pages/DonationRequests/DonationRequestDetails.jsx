import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

const DonationRequestDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [donating, setDonating] = useState(false);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/donation-requests/${id}`)
            .then((res) => {
                setRequest(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    const handleDonate = async () => {
        try {
            setDonating(true);
            await axios.patch(`${import.meta.env.VITE_API_URL}/donation-requests/${id}`, {
                status: "inprogress",
                donorName: user.displayName,
                donorEmail: user.email,
            });
            setRequest((prev) => ({
                ...prev,
                status: "inprogress",
                donorName: user.displayName,
                donorEmail: user.email,
            }));
            toast.success("Thank you! Donation confirmed.");
            setModalOpen(false);
        } catch {
            toast.error("Failed to confirm donation!");
        } finally {
            setDonating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!request) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-500 text-lg">Request not found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                {/* Header */}
                <div className="bg-gradient-to-r from-red-600 to-rose-500 rounded-xl p-6 mb-6 text-white">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">{request.recipientName}</h1>
                        <span className="bg-white text-red-600 font-extrabold px-4 py-1 rounded-full text-lg">
                            {request.bloodGroup}
                        </span>
                    </div>
                    <p className="text-red-100 mt-1">{request.hospitalName}</p>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-8">
                    {[
                        { icon: "📍", label: "Location", value: `${request.recipientDistrict}, ${request.recipientUpazila}` },
                        { icon: "🏥", label: "Hospital", value: request.hospitalName },
                        { icon: "📮", label: "Address", value: request.fullAddress },
                        { icon: "📅", label: "Date", value: request.donationDate },
                        { icon: "🕐", label: "Time", value: request.donationTime },
                        { icon: "👤", label: "Requested By", value: request.requesterName },
                        { icon: "📧", label: "Requester Email", value: request.requesterEmail },
                    ].map((item, i) => (
                        <div key={i} className="flex gap-3 items-start">
                            <span className="text-xl">{item.icon}</span>
                            <div>
                                <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                                <p className="text-gray-700 font-semibold">{item.value}</p>
                            </div>
                        </div>
                    ))}

                    <div className="bg-gray-50 rounded-xl p-4 mt-4">
                        <p className="text-xs text-gray-400 font-medium mb-1">📝 Request Message</p>
                        <p className="text-gray-700 text-sm leading-relaxed">{request.requestMessage}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-xl">🔖</span>
                        <div>
                            <p className="text-xs text-gray-400 font-medium">Status</p>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${request.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                                    request.status === "inprogress" ? "bg-blue-100 text-blue-700" :
                                        request.status === "done" ? "bg-green-100 text-green-700" :
                                            "bg-gray-100 text-gray-700"
                                }`}>
                                {request.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Donate Button */}
                {request.status === "pending" && (
                    <button
                        onClick={() => setModalOpen(true)}
                        className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition text-lg"
                    >
                        🩸 Donate Now
                    </button>
                )}
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Confirm Donation</h2>

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Donor Name</label>
                                <input
                                    type="text"
                                    value={user?.displayName}
                                    readOnly
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Donor Email</label>
                                <input
                                    type="email"
                                    value={user?.email}
                                    readOnly
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-gray-100"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={handleDonate}
                                disabled={donating}
                                className="flex-1 bg-red-600 text-white py-2.5 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-60"
                            >
                                {donating ? "Confirming..." : "Confirm Donation"}
                            </button>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="flex-1 bg-gray-200 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DonationRequestDetails;