"use client";

import React, { useState } from "react";
import { UserButton, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/providers/CartContext";
import useUserAuth from "@/hooks/useUserAuth";
import { HistoryIcon, ShoppingCart } from "lucide-react";
import useUserAdmin from "@/hooks/useUserAdmin";

const Navbar: React.FC = () => {
    useUserAdmin();
    const { isSignedIn } = useUserAuth();
    const { cartItems } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const links = [
        { href: "/menus", label: "Menu" },
        { href: "/story", label: "Our Story" },
        { href: "/contact", label: "Contact Us" },
        { href: "/about", label: "About Us" }
    ];

    return (
        <nav className="bg-white border-b border-gray-200 py-2 px-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-4">
                        <Link href="/">
                            <span className="text-2xl font-cursive cursor-pointer">
                                <Image
                                    src="https://www.donavicky.ca/images/dvickylogo.jpg"
                                    alt="Doña Vicky"
                                    className="h-16 w-auto object-contain"
                                    width={64}
                                    height={64}
                                />
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
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

                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-gray-800 focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    {isSignedIn && (
                        <>
                            <Link href="/orders" className="relative">
                                <span className="text-gray-800 hover:text-gray-600">
                                    <HistoryIcon />
                                </span>
                            </Link>
                            <Link href="/cart" className="relative">
                                <span className="text-gray-800 hover:text-gray-600">
                                    <ShoppingCart />
                                </span>
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-sm">
                                        {cartItems.length}
                                    </span>
                                )}
                            </Link>
                        </>
                    )}
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

            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 px-4 py-2">
                    <div className="flex flex-col ">
                        {links.map(({ href, label }) => (
                            <Link
                                key={label}
                                href={href}
                                className="text-gray-800 hover:text-gray-600"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                    <div className="mt-4 flex">
                        {isSignedIn && (
                            <>
                                <Link
                                    href="/orders"
                                    className="text-gray-800 hover:text-gray-600"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <HistoryIcon className="mr-2" />
                                </Link>
                                <Link
                                    href="/cart"
                                    className="text-gray-800 hover:text-gray-600"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <ShoppingCart className="mr-2" />
                                    {cartItems.length > 0 && (
                                        <span className="text-red-600">
                                            ({cartItems.length})
                                        </span>
                                    )}
                                </Link>
                            </>
                        )}
                        <div className="flex flex-col space-y-10">
                            {isSignedIn ? (
                                <UserButton />
                            ) : (
                                <SignInButton mode="modal">
                                    <button className="px-4 py-2 border border-black rounded hover:bg-gray-100 w-full">
                                        Sign In
                                    </button>
                                </SignInButton>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
