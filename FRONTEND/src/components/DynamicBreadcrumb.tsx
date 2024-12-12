"use client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

const DynamicBreadcrumb = () => {
    const pathName = usePathname();

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
