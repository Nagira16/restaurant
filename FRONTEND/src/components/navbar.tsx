"use client";
import React from "react";
import { UserButton, useAuth, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Navbar: React.FC = () => {
    const { isSignedIn } = useAuth();

    const links = [
        { href: "/menus", label: "Menu" },
        { href: "/", label: "Our Story" },
        { href: "/contact", label: "Contact Us" }
    ];

    return (
        <nav className="bg-white border-b border-gray-200 py-2 px-4">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center space-x-4">
                    <Link href="/">
                        <span className="text-2xl font-cursive cursor-pointer">
                            <Image
                                src="https://www.donavicky.ca/images/dvickylogo.jpg"
                                alt="Doña Vicky"
                                className="h-12 w-auto object-contain"
                                width={48}
                                height={48}
                            />
                        </span>
                    </Link>
                    <div className="flex space-x-6">
                        {links.map(({ href, label }) => (
                            <Link
                                key={label}
                                href={href}
                                className="text-gray-800 hover:text-gray-600"
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
                <div>
                    {isSignedIn ? (
                        <UserButton />
                    ) : (
                        <SignInButton mode="modal">
                            <button className="px-4 py-2 border border-black rounded hover:bg-gray-100">
                                Sign In
                            </button>
                        </SignInButton>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
