"use client";

import { getUserByClerkId } from "@/actions";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage
} from "@/components/ui/breadcrumb";
import { UserWithRoleName } from "@/types";
import { useUser } from "@clerk/nextjs";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const DynamicBreadcrumb = () => {
    const { user } = useUser();
    const router: AppRouterInstance = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        const fetchUser = async (clerkId: string) => {
            const result: UserWithRoleName | null = await getUserByClerkId(
                clerkId
            );

            if (!result) return;

            if (result.role.role_name !== "Admin") return router.push("/");
        };

        if (user?.id) {
            fetchUser(user.id);
        }
    }, [user]);

    const pathSegments = pathName
        ? pathName.split("/").filter((segment) => segment)
        : [];

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>

                {pathSegments.map((segment, index) => {
                    const href =
                        "/" + pathSegments.slice(0, index + 1).join("/");

                    return (
                        <div key={index} className=" flex items-center">
                            <BreadcrumbSeparator className="mr-2">
                                /
                            </BreadcrumbSeparator>

                            <BreadcrumbItem>
                                {index === pathSegments.length - 1 ? (
                                    <BreadcrumbPage>
                                        {segment.charAt(0).toUpperCase() +
                                            segment.slice(1)}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink href={href}>
                                        {segment.charAt(0).toUpperCase() +
                                            segment.slice(1)}
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </div>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default DynamicBreadcrumb;
