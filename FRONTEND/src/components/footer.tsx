import { Facebook, Instagram } from "lucide-react";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {
    const socialLinks = [
        {
            href: "https://www.facebook.com/p/Do%C3%B1a-VICKY-Mexican-Food-LTD-61550340506051/?_rdr",
            icon: (
                <Facebook className="h-5 w-5 text-gray-600 hover:text-gray-800" />
            ),
            label: "Facebook"
        },
        {
            href: "https://www.instagram.com/donavickymexicanfood",
            icon: (
                <Instagram className="h-5 w-5 text-gray-600 hover:text-gray-800" />
            ),
            label: "Instagram"
        }
    ];

    const helpfulLinks = [
        { href: "/service", label: "Service" },
        { href: "/support", label: "Support" },
        { href: "/terms", label: "Terms & Condition" },
        { href: "/privacy", label: "Privacy" }
    ];

    return (
        <footer className="bg-gray-100 py-12">
            <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row justify-between space-y-10 lg:space-y-0">
                {/* Logo and Address Section */}
                <div className="space-y-4 text-left">
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
                        {socialLinks.map(({ href, icon, label }) => (
                            <Link
                                key={label}
                                href={href}
                                aria-label={label}
                                className="text-gray-600 hover:text-gray-800"
                            >
                                {icon}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Opening Hours Section */}
                <div className="flex flex-col items-start space-y-2 text-left">
                    <h3 className="font-bold text-gray-800 text-xl">
                        Opening Hours
                    </h3>
                    <ul className="text-gray-600 space-y-1">
                        <li>Monday to Friday: 10:00 AM - 5:00 PM</li>
                        <li>Saturday: Closed</li>
                        <li>Sunday: 10:00 AM - 3:00 PM</li>
                    </ul>
                </div>

                {/* Helpful Links Section */}
                <div className="text-left">
                    <h3 className="font-bold text-gray-800 text-xl">
                        Helpful Links
                    </h3>
                    <ul className="mt-2 space-y-2">
                        {helpfulLinks.map(({ href, label }) => (
                            <li key={label}>
                                <Link
                                    href={href}
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
