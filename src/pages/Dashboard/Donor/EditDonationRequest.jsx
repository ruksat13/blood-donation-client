import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import districtData from "../../../utils/districts.json";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const EditDonationRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [upazilas, setUpazilas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/donation-requests/${id}`)
      .then((res) => {
        setRequest(res.data);
        const found = districtData.find((d) => d.name === res.data.recipientDistrict);
        setUpazilas(found ? found.upazilas : []);
      })
      .catch(() => toast.error("Failed to load request!"));
  }, [id]);

  const handleDistrictChange = (e) => {
    const found = districtData.find((d) => d.name === e.target.value);
    setUpazilas(found ? found.upazilas : []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updated = {
      recipientName: form.recipientName.value,
      recipientDistrict: form.recipientDistrict.value,
      recipientUpazila: form.recipientUpazila.value,
      hospitalName: form.hospitalName.value,
      fullAddress: form.fullAddress.value,
      bloodGroup: form.bloodGroup.value,
      donationDate: form.donationDate.value,
      donationTime: form.donationTime.value,
      requestMessage: form.requestMessage.value,
    };

    try {
      setLoading(true);
      await axios.patch(`${import.meta.env.VITE_API_URL}/donation-requests/${id}`, updated);
      toast.success("Donation request updated successfully!");
      navigate("/dashboard/my-donation-requests");
    } catch {
      toast.error("Failed to update request!");
    } finally {
      setLoading(false);
    }
  };

  if (!request) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Donation Request</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Name</label>
          <input
            type="text"
            name="recipientName"
            defaultValue={request.recipientName}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Recipient District</label>
          <select
            name="recipientDistrict"
            defaultValue={request.recipientDistrict}
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
            defaultValue={request.recipientUpazila}
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
            defaultValue={request.hospitalName}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
          <input
            type="text"
            name="fullAddress"
            defaultValue={request.fullAddress}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
          <select
            name="bloodGroup"
            defaultValue={request.bloodGroup}
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
            defaultValue={request.donationDate}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Donation Time</label>
          <input
            type="time"
            name="donationTime"
            defaultValue={request.donationTime}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Request Message</label>
          <textarea
            name="requestMessage"
            defaultValue={request.requestMessage}
            required
            rows="4"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-400"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-2.5 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-60"
        >
          {loading ? "Updating..." : "Update Donation Request"}
        </button>
      </form>
    </div>
  );
};

export default EditDonationRequest;