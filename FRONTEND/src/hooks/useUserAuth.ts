"use client";

import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { saveUser } from "@/actions";
import { UserData } from "@/types";

const useUserAuth = () => {
    const { isSignedIn } = useAuth();
    const { user, isLoaded } = useUser();

    useEffect(() => {
        const userAuth = async () => {
            if (!user) {
                return;
            }

            try {
                const {
                    emailAddresses,
                    phoneNumbers,
                    id,
                    username,
                    publicMetadata
                } = user;

                const userData: UserData = {
                    name: username,
                    email: emailAddresses?.[0]?.emailAddress,
                    phone: phoneNumbers?.[0]?.phoneNumber || null,
                    address: publicMetadata.address || null,
                    clerk_id: id
                };

                await saveUser(userData);
            } catch (error) {
                console.error(error);
            }
        };

        if (isSignedIn && isLoaded && user) {
            userAuth();
        }
    }, [isSignedIn, isLoaded, user]);

    return { isSignedIn, user, isLoaded };
};

export default useUserAuth;
