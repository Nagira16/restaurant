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

    const sections = [
        {
            title: "Information",
            links: ["About Us", "More Search", "Testimonials", "Events"]
        },
        {
            title: "Helpful Links",
            links: ["Service", "Support", "Terms & Condition", "Privacy"]
        },
        {
            title: "Our Menu",
            links: ["Special", "Popular", "Categories"]
        }
    ];

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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {sections.map((section) => (
                        <div key={section.title}>
                            <h3 className="font-semibold text-gray-800">
                                {section.title}
                            </h3>
                            <ul className="mt-2 space-y-2">
                                {section.links.map((link) => (
                                    <li key={link}>
                                        <Link
                                            href="#"
                                            className="text-gray-600 hover:text-gray-800"
                                        >
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
