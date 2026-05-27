import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-red-800 text-white pt-10 pb-6">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">🩸</span>
                        <span className="text-xl font-bold">BloodBridge</span>
                    </div>
                    <p className="text-red-200 text-sm">
                        Connecting donors with those in need. Every drop counts — be a hero today.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-red-200 text-sm">
                        <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                        <li><Link to="/donation-requests" className="hover:text-white transition">Donation Requests</Link></li>
                        <li><Link to="/search" className="hover:text-white transition">Search Donors</Link></li>
                        <li><Link to="/register" className="hover:text-white transition">Register</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-semibold text-lg mb-3">Contact Us</h3>
                    <ul className="space-y-2 text-red-200 text-sm">
                        <li>📧 support@bloodbridge.com</li>
                        <li>📞 +880 1700-000000</li>
                        <li>📍 Dhaka, Bangladesh</li>
                    </ul>
                    <div className="flex gap-4 mt-4">
                        <a href="#" className="hover:text-red-300 transition text-xl">𝕏</a>
                        <a href="#" className="hover:text-red-300 transition text-xl">f</a>
                        <a href="#" className="hover:text-red-300 transition text-xl">in</a>
                    </div>
                </div>
            </div>

            <div className="text-center text-red-300 text-sm mt-8 border-t border-red-700 pt-4">
                © {new Date().getFullYear()} BloodBridge. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;