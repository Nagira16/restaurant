import React from "react";
import { UserButton, useAuth } from "@clerk/nextjs";

const Navbar: React.FC = () => {
    const { isSignedIn } = useAuth();

    return (
        <nav>
            <div>
                <a href="/">Home</a>
                <a href="/about">About</a>
                {isSignedIn ? <UserButton /> : <a href="/sign-in">Sign In</a>}
            </div>
        </nav>
    );
};

export default Navbar;
