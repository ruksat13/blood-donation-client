const ContactSection = () => {
    return (
        <section className="py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Contact <span className="text-red-600">Us</span>
                    </h2>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        Have questions or need help? Reach out to us anytime.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Contact Form */}
                    <div className="bg-gray-50 p-8 rounded-2xl shadow-md">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Message
                                </label>
                                <textarea
                                    rows="4"
                                    placeholder="Write your message..."
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                                ></textarea>
                            </div>
                            <button className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition">
                                Send Message
                            </button>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="text-3xl">📧</div>
                            <div>
                                <h4 className="font-bold text-gray-800">Email</h4>
                                <p className="text-gray-500">support@bloodbridge.com</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="text-3xl">📞</div>
                            <div>
                                <h4 className="font-bold text-gray-800">Phone</h4>
                                <p className="text-gray-500">+880 1700-000000</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="text-3xl">📍</div>
                            <div>
                                <h4 className="font-bold text-gray-800">Address</h4>
                                <p className="text-gray-500">Dhaka, Bangladesh</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="text-3xl">🕐</div>
                            <div>
                                <h4 className="font-bold text-gray-800">Working Hours</h4>
                                <p className="text-gray-500">24/7 — Always Available</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;