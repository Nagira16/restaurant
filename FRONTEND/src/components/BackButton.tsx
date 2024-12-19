"use client";

import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ArrowLeft } from "lucide-react";

const BackButton = (): JSX.Element => {
    const router: AppRouterInstance = useRouter();

    return (
        <>
            <button
                onClick={() => router.back()}
                className="flex items-center mb-6"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Orders
            </button>
        </>
    );
};

export default BackButton;
