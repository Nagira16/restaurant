"use client";

import { FetchData } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const useUserAdmin = () => {
    const pathname: string | null = usePathname();
    const router: AppRouterInstance = useRouter();
    const { getToken } = useAuth();

    useEffect(() => {
        if (!pathname) return;

        const checkAdmin = async () => {
            try {
                const token: string | null = await getToken();

                if (!token) return;

                const res: Response = await fetch(
                    "http://localhost:3001/admin",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data: FetchData = await res.json();

                if (!data.success) {
                    router.push("/");
                }
            } catch (error) {
                console.error("Error checking admin status:", error);
            }
        };

        if (pathname.startsWith("/admin")) {
            checkAdmin();
        }
    }, [pathname, router, getToken]);
};

export default useUserAdmin;
