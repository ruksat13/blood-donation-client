import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/users?status=${filter}`)
            .then((res) => setUsers(res.data))
            .catch((err) => console.error(err));
    }, [filter]);

    const handleBlock = async (email) => {
        await axios.patch(`${import.meta.env.VITE_API_URL}/users/status/${email}`, { status: "blocked" });
        setUsers(users.map((u) => (u.email === email ? { ...u, status: "blocked" } : u)));
    };

    const handleUnblock = async (email) => {
        await axios.patch(`${import.meta.env.VITE_API_URL}/users/status/${email}`, { status: "active" });
        setUsers(users.map((u) => (u.email === email ? { ...u, status: "active" } : u)));
    };

    const handleMakeVolunteer = async (email) => {
        const result = await Swal.fire({
            title: "Make Volunteer?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes!",
        });
        if (result.isConfirmed) {
            await axios.patch(`${import.meta.env.VITE_API_URL}/users/role/${email}`, { role: "volunteer" });
            setUsers(users.map((u) => (u.email === email ? { ...u, role: "volunteer" } : u)));
            Swal.fire("Done!", "User is now a volunteer.", "success");
        }
    };

    const handleMakeAdmin = async (email) => {
        const result = await Swal.fire({
            title: "Make Admin?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes!",
        });
        if (result.isConfirmed) {
            await axios.patch(`${import.meta.env.VITE_API_URL}/users/role/${email}`, { role: "admin" });
            setUsers(users.map((u) => (u.email === email ? { ...u, role: "admin" } : u)));
            Swal.fire("Done!", "User is now an admin.", "success");
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">All Users</h2>

            {/* Filter */}
            <div className="mb-4">
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                    <option value="">All</option>
                    <option value="active">Active</option>
                    <option value="blocked">Blocked</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl shadow">
                <table className="w-full text-sm text-left">
                    <thead className="bg-red-600 text-white">
                        <tr>
                            <th className="px-4 py-3">Avatar</th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Role</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {users.map((u) => (
                            <tr key={u._id} className="hover:bg-red-50 transition">
                                <td className="px-4 py-3">
                                    <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-full object-cover border-2 border-red-300" />
                                </td>
                                <td className="px-4 py-3 font-medium">{u.name}</td>
                                <td className="px-4 py-3">{u.email}</td>
                                <td className="px-4 py-3 capitalize">
                                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-bold">
                                        {u.role}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${u.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                        }`}>
                                        {u.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-2 flex-wrap">
                                        {u.status === "active" ? (
                                            <button onClick={() => handleBlock(u.email)} className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600">Block</button>
                                        ) : (
                                            <button onClick={() => handleUnblock(u.email)} className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600">Unblock</button>
                                        )}
                                        {u.role !== "volunteer" && u.role !== "admin" && (
                                            <button onClick={() => handleMakeVolunteer(u.email)} className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600">Make Volunteer</button>
                                        )}
                                        {u.role !== "admin" && (
                                            <button onClick={() => handleMakeAdmin(u.email)} className="bg-purple-500 text-white px-2 py-1 rounded text-xs hover:bg-purple-600">Make Admin</button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;