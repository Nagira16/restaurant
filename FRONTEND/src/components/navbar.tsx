// "use client";
// import React from "react";
// import { UserButton, SignInButton } from "@clerk/nextjs";
// import Image from "next/image";
// import Link from "next/link";
// import useUserAuth from "@/hooks/useUserAuth";

// const Navbar: React.FC = () => {
//     const { isSignedIn } = useUserAuth();

//     const links = [
//         { href: "/menus", label: "Menu" },
//         { href: "/", label: "Our Story" },
//         { href: "/contact", label: "Contact Us" },
//         { href: "/about", label: "About Us" }
//     ];

//     return (
//         <nav className="bg-white border-b border-gray-200 py-2 px-4">
//             <div className="flex items-center justify-between max-w-7xl mx-auto">
//                 {/* Logo Section */}
//                 <div className="flex items-center space-x-4">
//                     <Link href="/">
//                         <span className="text-2xl font-cursive cursor-pointer">
//                             <Image
//                                 src="https://www.donavicky.ca/images/dvickylogo.jpg"
//                                 alt="Doña Vicky"
//                                 className="h-16 w-auto object-contain"
//                                 width={64}
//                                 height={64}
//                                 priority
//                             />
//                         </span>
//                     </Link>

//                     {/* Navigation Links */}
//                     <div className="flex space-x-6">
//                         {links.map(({ href, label }) => (
//                             <Link
//                                 key={label}
//                                 href={href}
//                                 className="text-gray-800 hover:text-gray-600"
//                             >
//                                 {label}
//                             </Link>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Right Section */}
//                 <div className="flex items-center space-x-6">
//                     {/* Cart Link - Only for Signed In Users */}
//                     {isSignedIn && (
//                         <Link
//                             href="/cart"
//                             className="text-red-600 font-semibold hover:text-red-700"
//                         >
//                             Shopping Cart
//                         </Link>
//                     )}
//                     {/* Authentication Section */}
//                     {isSignedIn ? (
//                         <UserButton />
//                     ) : (
//                         <SignInButton mode="modal">
//                             <button className="px-4 py-2 border border-black rounded hover:bg-gray-100">
//                                 Sign In
//                             </button>
//                         </SignInButton>
//                     )}
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;

"use client";

import React from "react";
import { UserButton, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/providers/CartContext";
import useUserAuth from "@/hooks/useUserAuth";

const Navbar: React.FC = () => {
    const { isSignedIn } = useUserAuth();
    const { cartItems } = useCart();

    const links = [
        { href: "/menus", label: "Menu" },
        { href: "/", label: "Our Story" },
        { href: "/contact", label: "Contact Us" },
        { href: "/about", label: "About Us" }
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
                                className="h-16 w-auto object-contain"
                                width={64}
                                height={64}
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
                <div className="flex items-center space-x-4">
                    {isSignedIn && (
                        <Link href="/cart" className="relative">
                            <span className="text-gray-800 hover:text-gray-600">
                                Shopping Cart
                            </span>
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-sm">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>
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
        </nav>
    );
};

export default Navbar;
