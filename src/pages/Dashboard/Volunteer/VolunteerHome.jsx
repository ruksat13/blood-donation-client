import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import axiosSecure from "../../../utils/axiosSecure";
import { FaTint, FaDollarSign, FaUsers } from "react-icons/fa";

const VolunteerHome = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalFunding: 0,
        totalRequests: 0,
    });

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/admin/stats`)
            .then((res) => setStats(res.data))
            .catch((err) => console.error(err));
    }, []);

    const cards = [
        {
            icon: <FaUsers className="text-4xl text-blue-500" />,
            count: stats.totalUsers,
            title: "Total Donors",
            bg: "bg-blue-50",
            border: "border-blue-200",
        },
        {
            icon: <FaDollarSign className="text-4xl text-green-500" />,
            count: `$${stats.totalFunding}`,
            title: "Total Funding",
            bg: "bg-green-50",
            border: "border-green-200",
        },
        {
            icon: <FaTint className="text-4xl text-red-500" />,
            count: stats.totalRequests,
            title: "Total Donation Requests",
            bg: "bg-red-50",
            border: "border-red-200",
        },
    ];

    return (
        <div>
            <div className="bg-gradient-to-r from-red-600 to-rose-500 text-white rounded-2xl p-6 mb-8">
                <h1 className="text-2xl font-bold">Welcome back, {user?.displayName}! 👋</h1>
                <p className="text-red-100 mt-1">Here is your volunteer overview.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={`${card.bg} border ${card.border} rounded-2xl p-6 flex items-center gap-4 shadow-sm`}
                    >
                        {card.icon}
                        <div>
                            <p className="text-2xl font-bold text-gray-800">{card.count}</p>
                            <p className="text-gray-500 text-sm">{card.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VolunteerHome;