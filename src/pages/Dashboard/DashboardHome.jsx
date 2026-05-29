import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import DonorHome from "./Donor/DonorHome";
import AdminHome from "./Admin/AdminHome";
import VolunteerHome from "./Volunteer/VolunteerHome";

const DashboardHome = () => {
    const { user } = useAuth();
    const [role, setRole] = useState(null);

    useEffect(() => {
        if (user?.email) {
            axios
                .get(`${import.meta.env.VITE_API_URL}/users/role/${user.email}`)
                .then((res) => setRole(res.data.role))
                .catch(() => setRole("donor"));
        }
    }, [user]);

    if (!role) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (role === "admin") return <AdminHome />;
    if (role === "volunteer") return <VolunteerHome />;
    return <DonorHome />;
};

export default DashboardHome;