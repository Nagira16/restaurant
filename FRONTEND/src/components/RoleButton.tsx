"use client";

import { getUserByClerkId } from "@/actions";
import { UserWithRoleName } from "@/types";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";

const RoleButton = () => {
    const { user } = useUser();
    const [userRole, setUserRole] = useState<string>("");

    useEffect(() => {
        const fetchUser = async (clerkId: string) => {
            const result: UserWithRoleName | null = await getUserByClerkId(
                clerkId
            );

            if (!result) return;

            setUserRole(result.role.role_name);
        };

        if (user?.id) {
            fetchUser(user.id);
        }
    }, [user]);
    return (
        <div>
            {userRole === "Admin" && (
                <Link
                    className="text-gray-800 hover:text-gray-600"
                    href={"/admin"}
                >
                    Admin
                </Link>
            )}
            {userRole === "Store" && (
                <Link className="text-gray-800 hover:text-gray-600" href={"/"}>
                    User
                </Link>
            )}
        </div>
    );
};

export default RoleButton;
