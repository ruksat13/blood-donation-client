import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import axiosSecure from "../../../utils/axiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyDonationRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/donation-requests/user/${user.email}?status=${filter}&page=${currentPage}&limit=5`)
        .then((res) => {
          setRequests(res.data.requests);
          setTotalPages(res.data.totalPages);
        })
        .catch((err) => console.error(err));
    }
  }, [user, filter, currentPage]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This donation request will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await axiosSecure.delete(`${import.meta.env.VITE_API_URL}/donation-requests/${id}`);
      setRequests(requests.filter((r) => r._id !== id));
      Swal.fire("Deleted!", "Your request has been deleted.", "success");
    }
  };

  const handleStatusChange = async (id, status) => {
    await axiosSecure.patch(`${import.meta.env.VITE_API_URL}/donation-requests/${id}`, { status });
    setRequests(requests.map((r) => (r._id === id ? { ...r, status } : r)));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Donation Requests</h2>

      {/* Filter */}
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => { setFilter(e.target.value); setCurrentPage(1); }}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="w-full text-sm text-left">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="px-4 py-3">Recipient</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Blood Group</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {requests?.map((req) => (
              <tr key={req._id} className="hover:bg-red-50 transition">
                <td className="px-4 py-3 font-medium">{req.recipientName}</td>
                <td className="px-4 py-3">{req.recipientDistrict}, {req.recipientUpazila}</td>
                <td className="px-4 py-3">{req.donationDate}</td>
                <td className="px-4 py-3">
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold">
                    {req.bloodGroup}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    req.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                    req.status === "inprogress" ? "bg-blue-100 text-blue-700" :
                    req.status === "done" ? "bg-green-100 text-green-700" :
                    "bg-gray-100 text-gray-700"
                  }`}>
                    {req.status}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-2 flex-wrap">
                  {req.status === "inprogress" && (
                    <>
                      <button onClick={() => handleStatusChange(req._id, "done")} className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600">Done</button>
                      <button onClick={() => handleStatusChange(req._id, "canceled")} className="bg-gray-500 text-white px-2 py-1 rounded text-xs hover:bg-gray-600">Cancel</button>
                    </>
                  )}
                  <Link to={`/dashboard/edit-donation-request/${req._id}`} className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600">Edit</Link>
                  <button onClick={() => handleDelete(req._id)} className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600">Delete</button>
                  <Link to={`/donation-requests/${req._id}`} className="bg-purple-500 text-white px-2 py-1 rounded text-xs hover:bg-purple-600">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              currentPage === page
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-red-100"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MyDonationRequests;