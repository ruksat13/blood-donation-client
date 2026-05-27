import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DonationRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/donation-requests/pending`)
            .then((res) => {
                setRequests(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-3">
                        Blood Donation <span className="text-red-600">Requests</span>
                    </h1>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        These are urgent blood donation requests. Your donation can save a life today.
                    </p>
                </div>

                {requests.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🩸</div>
                        <p className="text-gray-500 text-lg">No pending donation requests at the moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {requests.map((req) => (
                            <div
                                key={req._id}
                                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100 overflow-hidden"
                            >
                                <div className="bg-gradient-to-r from-red-600 to-rose-500 px-5 py-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-white font-bold text-lg">{req.recipientName}</h3>
                                        <span className="bg-white text-red-600 font-extrabold px-3 py-1 rounded-full text-sm">
                                            {req.bloodGroup}
                                        </span>
                                    </div>
                                </div>

                                <div className="px-5 py-4 space-y-2">
                                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                                        <span>📍</span>
                                        <span>{req.recipientDistrict}, {req.recipientUpazila}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                                        <span>📅</span>
                                        <span>{req.donationDate}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                                        <span>🕐</span>
                                        <span>{req.donationTime}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span>🏥</span>
                                        <span className="text-gray-600">{req.hospitalName}</span>
                                    </div>
                                </div>

                                <div className="px-5 pb-5">
                                    <Link
                                        to={`/donation-requests/${req._id}`}
                                        className="block w-full text-center bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DonationRequests;