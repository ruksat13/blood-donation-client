import { useNavigate } from "react-router-dom";

const Banner = () => {
    const navigate = useNavigate();

    return (
        <section className="relative bg-gradient-to-br from-red-700 via-red-600 to-rose-500 text-white py-24 px-4 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-5xl mx-auto text-center relative z-10">
                <div className="text-6xl mb-6">🩸</div>
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                    Save a Life, <br />
                    <span className="text-yellow-300">Donate Blood Today</span>
                </h1>
                <p className="text-lg md:text-xl text-red-100 mb-10 max-w-2xl mx-auto">
                    Join thousands of heroes who are making a difference. Connect with
                    blood recipients in your area and give the gift of life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate("/register")}
                        className="bg-white text-red-700 font-bold px-8 py-3 rounded-full hover:bg-yellow-300 hover:text-red-800 transition duration-300 shadow-lg"
                    >
                        Join as a Donor
                    </button>
                    <button
                        onClick={() => navigate("/search")}
                        className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-red-700 transition duration-300"
                    >
                        Search Donors
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Banner;