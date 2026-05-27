const features = [
    {
        icon: "💉",
        title: "Easy Registration",
        description:
            "Register as a donor in minutes. Fill in your details, blood group, and location to get started.",
    },
    {
        icon: "🏥",
        title: "Find Donors Nearby",
        description:
            "Search for blood donors in your district and upazila instantly when you need them most.",
    },
    {
        icon: "🤝",
        title: "Community Support",
        description:
            "Be part of a growing community of life-savers. Every donation makes a real difference.",
    },
    {
        icon: "🔒",
        title: "Safe & Secure",
        description:
            "Your data is protected. We ensure a safe and trusted platform for donors and recipients.",
    },
    {
        icon: "📱",
        title: "Always Available",
        description:
            "Access BloodBridge anytime, anywhere. Our platform is available 24/7 on all devices.",
    },
    {
        icon: "❤️",
        title: "Save Lives",
        description:
            "One donation can save up to three lives. Be a hero and make every drop count.",
    },
];

const FeaturedSection = () => {
    return (
        <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Why Choose <span className="text-red-600">BloodBridge?</span>
                    </h2>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        We make blood donation simple, safe, and impactful. Here is what
                        makes us different.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 border border-gray-100 flex flex-col items-start gap-4"
                        >
                            <div className="text-4xl">{feature.icon}</div>
                            <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedSection;