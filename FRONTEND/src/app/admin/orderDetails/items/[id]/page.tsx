"use client";

import { getAllTablesById } from "@/actions";
import { Button } from "@/components/ui/button";
import { Endpoint, ItemOrderDetailsWithMenuInfo } from "@/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminItemOrderDetails = ({
    params
}: {
    params: { id: string };
}): JSX.Element => {
    const orderDetailId: string = params.id;
    const [itemOrderDetails, setItemOrderDetails] = useState<
        ItemOrderDetailsWithMenuInfo[] | null
    >(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router: AppRouterInstance = useRouter();

    const fetchItemOrderDetails = async (): Promise<void> => {
        const result = await getAllTablesById<
            ItemOrderDetailsWithMenuInfo[] | null
        >(Endpoint.itemOrderDetails, orderDetailId);
        if (result) {
            setItemOrderDetails(result);
            setIsLoading(false);
        } else {
            router.push("/admin");
        }
    };

    useEffect(() => {
        fetchItemOrderDetails();
    }, [orderDetailId]);

    if (isLoading) {
        return (
            <div className="min-h-screen grid place-content-center animate-pulse">
                Loading...
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Item Order Details</h1>
            {itemOrderDetails && itemOrderDetails.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {itemOrderDetails.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center"
                        >
                            {item.menu.image && (
                                <div className="mb-4">
                                    <Image
                                        src={item.menu.image}
                                        alt={item.menu.name || "No Name"}
                                        width={200}
                                        height={100}
                                        objectFit="contain"
                                    />
                                </div>
                            )}

                            <div className="text-center">
                                <p className="text-xl font-semibold">
                                    {item.menu.name || "No Name"}
                                </p>
                                <p>
                                    <strong>Quantity:</strong> {item.quantity}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>No items found</div>
            )}
            <div className="flex gap-2 mt-6">
                <Button
                    variant="outline"
                    className="rounded-xl"
                    onClick={() => router.back()}
                >
                    Back
                </Button>
            </div>
        </div>
    );
};

export default AdminItemOrderDetails;
