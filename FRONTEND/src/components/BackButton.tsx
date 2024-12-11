"use client";

import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ChevronLeft } from "lucide-react";

const BackButton = () => {
    const router: AppRouterInstance = useRouter();

    return (
        <>
            <button onClick={() => router.back()}>
                <ChevronLeft className=" mt-5 ml-5" />
            </button>
        </>
    );
};

export default BackButton;
