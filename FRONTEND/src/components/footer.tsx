import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-100 py-12">
            <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row justify-between space-y-10 lg:space-y-0">
                <div className="space-y-4">
                    {/* Placeholder for Logo */}
                    <div className="text-2xl font-bold">DONA VICKY LOGO</div>
                    <address className="not-italic text-gray-600">
                        428 Carrall St, Vancouver, BC
                        <br />
                        V6B 2J7, Canada
                    </address>
                    <address className="not-italic text-gray-600 mt-4">
                        831 12th St, New Westminster, BC
                        <br />
                        V3M 4K4, Canada
                    </address>
                    <div className="flex space-x-4 mt-4">
                        <a
                            href="#"
                            className="text-gray-600 hover:text-gray-800"
                        >
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a
                            href="#"
                            className="text-gray-600 hover:text-gray-800"
                        >
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a
                            href="#"
                            className="text-gray-600 hover:text-gray-800"
                        >
                            <i className="fab fa-twitter"></i>
                        </a>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    <div>
                        <h3 className="font-semibold text-gray-800">
                            Information
                        </h3>
                        <ul className="mt-2 space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    More Search
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    Testimonials
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    Events
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800">
                            Helpful Links
                        </h3>
                        <ul className="mt-2 space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    Service
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    Support
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    Terms & Condition
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    Privacy
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800">
                            Our Menu
                        </h3>
                        <ul className="mt-2 space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    Special
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    Popular
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    Categories
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
