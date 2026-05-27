import Funding from "../pages/Funding/Funding";
import EditDonationRequest from "../pages/Dashboard/Donor/EditDonationRequest";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import DonationRequests from "../pages/DonationRequests/DonationRequests";
import DonationRequestDetails from "../pages/DonationRequests/DonationRequestDetails";
import Search from "../pages/Search/Search";
import PrivateRoute from "./PrivateRoute";

// Donor Dashboard
import DonorHome from "../pages/Dashboard/Donor/DonorHome";
import MyDonationRequests from "../pages/Dashboard/Donor/MyDonationRequests";
import CreateDonationRequest from "../pages/Dashboard/Donor/CreateDonationRequest";

// Admin Dashboard
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import AllUsers from "../pages/Dashboard/Admin/AllUsers";
import AllBloodDonationRequests from "../pages/Dashboard/Admin/AllBloodDonationRequests";

// Volunteer Dashboard
import VolunteerHome from "../pages/Dashboard/Volunteer/VolunteerHome";
import VolunteerAllRequests from "../pages/Dashboard/Volunteer/VolunteerAllRequests";

// Profile
import Profile from "../pages/Dashboard/Profile";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
            { path: "/donation-requests", element: <DonationRequests /> },
            {
                path: "/donation-requests/:id",
                element: (
                    <PrivateRoute>
                        <DonationRequestDetails />
                    </PrivateRoute>
                ),
            },
            { path: "/search", element: <Search /> },
            {
                path: "/funding",
                element: (
                    <PrivateRoute>
                        <Funding />
                    </PrivateRoute>
                ),
            },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            // Profile
            { path: "profile", element: <Profile /> },

            // Donor
            { path: "", element: <DonorHome /> },
            { path: "my-donation-requests", element: <MyDonationRequests /> },
            { path: "create-donation-request", element: <CreateDonationRequest /> },
            { path: "edit-donation-request/:id", element: <EditDonationRequest /> },

            // Admin
            { path: "admin-home", element: <AdminHome /> },
            { path: "all-users", element: <AllUsers /> },
            { path: "all-blood-donation-request", element: <AllBloodDonationRequests /> },

            // Volunteer
            { path: "volunteer-home", element: <VolunteerHome /> },
            { path: "volunteer-all-requests", element: <VolunteerAllRequests /> },
        ],
    },
]);

export default Router;