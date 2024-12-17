"use client";

import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { getUserByClerkId, saveUser } from "@/actions";
import { UserData, UserWithRoleName } from "@/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

const useUserAuth = () => {
    const router: AppRouterInstance = useRouter();
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
                    image: user.imageUrl,
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
