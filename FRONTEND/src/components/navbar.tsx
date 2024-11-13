"use client";
import React from "react";
import { UserButton, useAuth, SignInButton } from "@clerk/nextjs";

const Navbar: React.FC = () => {
    const { isSignedIn } = useAuth();

    return (
        <nav className="bg-white border-b border-gray-200 py-3 px-5">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center space-x-4">
                    <span className="text-2xl font-cursive">LOGO</span>
                    <div className="flex space-x-6">
                        <a
                            href="/"
                            className="text-gray-800 hover:text-gray-600"
                        >
                            Home Menu
                        </a>
                        <a
                            href="/our-story"
                            className="text-gray-800 hover:text-gray-600"
                        >
                            Our Story
                        </a>
                        <a
                            href="/contact"
                            className="text-gray-800 hover:text-gray-600"
                        >
                            Contact Us
                        </a>
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
