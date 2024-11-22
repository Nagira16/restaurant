import React from "react";
import Image from "next/image";

const SupportPage = () => {
    return (
        <div className="bg-gray-50 py-12">
            {/* Hero Section */}
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h1 className="text-4xl font-bold text-gray-800">Support</h1>
                <p className="mt-4 text-gray-600 text-lg">
                    Need help? At Doña Vicky, we’re here to make sure your
                    dining experience is seamless. Check out our frequently
                    asked questions or contact us for personalized support.
                </p>
            </div>

            {/* FAQ Section */}
            <div className="max-w-6xl mx-auto px-6 mt-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-2xl font-semibold text-gray-800">
                            What are your opening hours?
                        </h3>
                        <p className="mt-2 text-gray-600">
                            We’re open Monday to Friday from 10:00 AM to 5:00 PM
                            and Sunday from 10:00 AM to 3:00 PM. We’re closed on
                            Saturdays.
                        </p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-2xl font-semibold text-gray-800">
                            Do you offer catering services?
                        </h3>
                        <p className="mt-2 text-gray-600">
                            Currently, we do not offer catering services.
                            However, our takeaway option is perfect for larger
                            orders.
                        </p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-2xl font-semibold text-gray-800">
                            Where are you located?
                        </h3>
                        <p className="mt-2 text-gray-600">
                            We have two locations: 428 Carrall St, Vancouver,
                            BC, and 831 12th St, New Westminster, BC.
                        </p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-2xl font-semibold text-gray-800">
                            Do you accommodate dietary restrictions?
                        </h3>
                        <p className="mt-2 text-gray-600">
                            Yes! Please let our staff know about your dietary
                            restrictions, and we’ll do our best to accommodate
                            them.
                        </p>
                    </div>
                </div>
            </div>

            {/* Contact Us Section */}
            <div className="max-w-6xl mx-auto px-6 mt-16 text-center">
                <h2 className="text-3xl font-bold text-gray-800">
                    Still need help?
                </h2>
                <p className="mt-4 text-gray-600">
                    Reach out to us directly, and our team will assist you as
                    soon as possible.
                </p>
                <a
                    href="/contact"
                    className="mt-6 inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-all"
                >
                    Contact Us
                </a>
            </div>
        </div>
    );
};

export default SupportPage;
