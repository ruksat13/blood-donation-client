import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [amount, setAmount] = useState("");
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        try {
            setProcessing(true);
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
                amount: parseInt(amount),
            });

            const result = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: { name: user.displayName, email: user.email },
                },
            });

            if (result.error) {
                toast.error(result.error.message);
            } else if (result.paymentIntent.status === "succeeded") {
                await axios.post(`${import.meta.env.VITE_API_URL}/fundings`, {
                    name: user.displayName,
                    email: user.email,
                    amount: parseInt(amount),
                    date: new Date().toLocaleDateString(),
                });
                toast.success("Funding successful! Thank you!");
                onSuccess();
            }
        } catch {
            toast.error("Payment failed!");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (USD)</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    min="1"
                    placeholder="Enter amount"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Details</label>
                <div className="border border-gray-300 rounded-lg px-4 py-3">
                    <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
                </div>
            </div>
            <button
                type="submit"
                disabled={!stripe || processing}
                className="w-full bg-red-600 text-white py-2.5 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-60"
            >
                {processing ? "Processing..." : "Give Fund"}
            </button>
        </form>
    );
};

const Funding = () => {
    const [fundings, setFundings] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchFundings = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/fundings`)
            .then((res) => {
                setFundings(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        fetchFundings();
    }, []);

    const handleSuccess = () => {
        setModalOpen(false);
        fetchFundings();
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Funding <span className="text-red-600">History</span>
                    </h1>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="bg-red-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-red-700 transition"
                    >
                        Give Fund
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-xl shadow">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-red-600 text-white">
                                <tr>
                                    <th className="px-4 py-3">Donor Name</th>
                                    <th className="px-4 py-3">Amount (USD)</th>
                                    <th className="px-4 py-3">Date</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {fundings.map((f) => (
                                    <tr key={f._id} className="hover:bg-red-50 transition">
                                        <td className="px-4 py-3 font-medium">{f.name}</td>
                                        <td className="px-4 py-3 text-green-700 font-bold">${f.amount}</td>
                                        <td className="px-4 py-3 text-gray-500">{f.date}</td>
                                    </tr>
                                ))}
                                {fundings.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="text-center py-10 text-gray-400">No funding records yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Make a Donation</h2>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm onSuccess={handleSuccess} />
                        </Elements>
                        <button
                            onClick={() => setModalOpen(false)}
                            className="w-full mt-4 bg-gray-200 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Funding;