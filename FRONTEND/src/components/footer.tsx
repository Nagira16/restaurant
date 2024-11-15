import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-100 py-12">
            <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row justify-between space-y-10 lg:space-y-0">
                <div className="space-y-4">
                    <div className="text-2xl font-bold">
                        <Image
                            src="https://www.donavicky.ca/images/dvickylogo.jpg"
                            alt="Footer logo"
                            width={64}
                            height={64}
                            className="h-16 w-auto"
                        />
                    </div>
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
                        <Link
                            href="#"
                            className="text-gray-600 hover:text-gray-800"
                        >
                            <i className="fab fa-facebook-f"></i>
                        </Link>
                        <Link
                            href="#"
                            className="text-gray-600 hover:text-gray-800"
                        >
                            <i className="fab fa-instagram"></i>
                        </Link>
                        <Link
                            href="#"
                            className="text-gray-600 hover:text-gray-800"
                        >
                            <i className="fab fa-twitter"></i>
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    <div>
                        <h3 className="font-semibold text-gray-800">
                            Information
                        </h3>
                        <ul className="mt-2 space-y-2">
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    More Search
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    Testimonials
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    Events
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800">
                            Helpful Links
                        </h3>
                        <ul className="mt-2 space-y-2">
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    Support
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    Terms & Condition
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    Privacy
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800">
                            Our Menu
                        </h3>
                        <ul className="mt-2 space-y-2">
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    Special
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    Popular
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    Categories
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
