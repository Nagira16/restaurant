import { Facebook, Instagram } from "lucide-react";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import logoImage from "../Image/dona.jpg";

const Footer: React.FC = () => {
    const socialLinks = [
        {
            href: "https://www.facebook.com/p/Do%C3%B1a-VICKY-Mexican-Food-LTD-61550340506051/?_rdr",
            icon: (
                <Facebook className="h-6 w-6 text-gray-600 hover:text-red-600 transition-colors" />
            ),
            label: "Facebook"
        },
        {
            href: "https://www.instagram.com/donavickymexicanfood",
            icon: (
                <Instagram className="h-6 w-6 text-gray-600 hover:text-red-600 transition-colors" />
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
        <footer className="bg-gray-100 py-8">
            {/* ///////////////CHECK THIS */}
            <div className=" max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Logo and Address Section */}
                <div className="space-y-4">
                    <Link href="/">
                        <Image
                            src={logoImage}
                            alt="Footer logo"
                            width={120}
                            height={120}
                            className="h-28 w-auto mx-auto lg:mx-0 rounded-lg"
                        />
                    </Link>
                    <div className="text-gray-600 text-sm leading-relaxed">
                        <p className="mb-2">
                            428 Carrall St, Vancouver, BC
                            <br />
                            V6B 2J7, Canada
                        </p>
                        <p>
                            831 12th St, New Westminster, BC
                            <br />
                            V3M 4K4, Canada
                        </p>
                    </div>
                </div>

                {/* Opening Hours Section */}
                <div className="space-y-4">
                    <h3 className="font-bold text-lg text-gray-800">
                        Opening Hours
                    </h3>
                    <ul className="text-gray-600 text-sm space-y-1">
                        <li>Monday to Friday: 10:00 AM - 5:00 PM</li>
                        <li>Saturday: Closed</li>
                        <li>Sunday: 10:00 AM - 3:00 PM</li>
                    </ul>
                </div>

                {/* Helpful Links Section */}
                <div className="space-y-4">
                    <h3 className="font-bold text-lg text-gray-800">
                        Helpful Links
                    </h3>
                    <ul className="text-gray-600 text-sm space-y-2">
                        {helpfulLinks.map(({ href, label }) => (
                            <li key={label}>
                                <Link
                                    href={href}
                                    className="hover:text-red-600 transition-colors"
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Social Media Section */}
                <div className="space-y-3">
                    <h3 className="font-bold text-lg text-gray-800">
                        Follow Us
                    </h3>
                    <div className="flex justify-start space-x-4">
                        {socialLinks.map(({ href, icon, label }) => (
                            <Link
                                key={label}
                                href={href}
                                aria-label={label}
                                className="hover:text-red-600 transition-colors"
                            >
                                {icon}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-6 text-center text-gray-500 text-sm">
                <p>
                    &copy; {new Date().getFullYear()} Doña Vicky. All Rights
                    Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
