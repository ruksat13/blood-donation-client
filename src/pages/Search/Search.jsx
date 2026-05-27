import { useState } from "react";
import axios from "axios";
import districtData from "../../utils/districts.json";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Search = () => {
    const [upazilas, setUpazilas] = useState([]);
    const [donors, setDonors] = useState([]);
    const [searched, setSearched] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDistrictChange = (e) => {
        const found = districtData.find((d) => d.name === e.target.value);
        setUpazilas(found ? found.upazilas : []);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        const form = e.target;
        const bloodGroup = form.bloodGroup.value;
        const district = form.district.value;
        const upazila = form.upazila.value;

        try {
            setLoading(true);
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/users/search?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`
            );
            setDonors(res.data);
            setSearched(true);
        } catch {
            setDonors([]);
            setSearched(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-800 mb-3">
                        Search <span className="text-red-600">Donors</span>
                    </h1>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        Find blood donors near you by selecting blood group, district, and upazila.
                    </p>
                </div>

                {/* Search Form */}
                <div className="bg-white rounded-2xl shadow-md p-8 mb-10 max-w-3xl mx-auto">
                    <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                            <select
                                name="bloodGroup"
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-400"
                            >
                                <option value="">Select</option>
                                {bloodGroups.map((bg) => (
                                    <option key={bg} value={bg}>{bg}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                            <select
                                name="district"
                                required
                                onChange={handleDistrictChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-400"
                            >
                                <option value="">Select</option>
                                {districtData.map((d) => (
                                    <option key={d.name} value={d.name}>{d.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Upazila</label>
                            <select
                                name="upazila"
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-400"
                            >
                                <option value="">Select</option>
                                {upazilas.map((u) => (
                                    <option key={u} value={u}>{u}</option>
                                ))}
                            </select>
                        </div>

                        <div className="sm:col-span-3">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-red-600 text-white py-2.5 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-60"
                            >
                                {loading ? "Searching..." : "Search Donors"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Results */}
                {searched && (
                    <div>
                        {donors.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">🔍</div>
                                <p className="text-gray-500 text-lg">No donors found for your search criteria.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {donors.map((donor) => (
                                    <div
                                        key={donor._id}
                                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100 p-6 flex items-center gap-4"
                                    >
                                        <img
                                            src={donor.avatar}
                                            alt={donor.name}
                                            className="w-16 h-16 rounded-full object-cover border-4 border-red-300"
                                        />
                                        <div>
                                            <h3 className="font-bold text-gray-800 text-lg">{donor.name}</h3>
                                            <p className="text-gray-500 text-sm">{donor.district}, {donor.upazila}</p>
                                            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold mt-2 inline-block">
                                                {donor.bloodGroup}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;