"use client";

import EditOrderDetailStatus from "@/components/EditOrderDetailStatus";
import EditOrderDetailStatusMoblie from "@/components/EditOrderDetailStatusMobile";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    FetchData,
    Order_DetailsWithUserName,
    OrderDetailsStatus
} from "@/types";
import { useAuth } from "@clerk/nextjs";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AdminOrderDetailsDashBoard = (): JSX.Element => {
    const [allOrderDetails, setOrderDetails] = useState<
        Order_DetailsWithUserName[]
    >([]);
    const [statusMap, setStatusMap] = useState<
        Map<string, OrderDetailsStatus | null>
    >(new Map());
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { getToken } = useAuth();
    const router: AppRouterInstance = useRouter();

    const fetchAllOrderDetails = async (): Promise<void> => {
        const token: string | null = await getToken();
        if (!token) return;

        const res: Response = await fetch(
            "http://localhost:3001/admin/orderDetails",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data: FetchData = await res.json();

        if (data.success) {
            const result = data.results as Order_DetailsWithUserName[];
            setOrderDetails(result);

            const newStatusMap = new Map<string, OrderDetailsStatus | null>();
            result.forEach((order) => {
                newStatusMap.set(order.id, order.status);
            });
            setStatusMap(newStatusMap);

            setIsLoading(false);
        } else {
            Swal.fire({
                title: data.message,
                icon: "error"
            });
        }
    };

    useEffect(() => {
        fetchAllOrderDetails();
    }, []);

    const handleStatusChange = (
        orderDetailId: string,
        newStatus: OrderDetailsStatus
    ) => {
        setStatusMap((prev) => {
            const updatedMap = new Map(prev);
            updatedMap.set(orderDetailId, newStatus);
            return updatedMap;
        });
    };

    return (
        <div>
            {isLoading ? (
                <div className="min-h-screen grid place-content-center animate-pulse">
                    Loading...
                </div>
            ) : (
                <div className="overflow-x-auto w-full">
                    <div className="flex items-center flex-wrap">
                        <h1 className="text-3xl font-bold mb-4">
                            Order Details Management
                        </h1>
                    </div>
                    <div className="min-w-full">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="lg:table-cell hidden">
                                        Order
                                    </TableHead>
                                    <TableHead>User Name</TableHead>
                                    <TableHead className="lg:table-cell hidden">
                                        Total Price
                                    </TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="lg:table-cell hidden">
                                        Date
                                    </TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {allOrderDetails.map((orderDetail, index) => {
                                    const currentStatus =
                                        statusMap.get(orderDetail.id) ||
                                        orderDetail.status;

                                    return (
                                        <TableRow key={orderDetail.id}>
                                            <TableCell className="lg:table-cell hidden">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>
                                                {orderDetail.user.name}
                                            </TableCell>
                                            <TableCell className="lg:table-cell hidden">
                                                $
                                                {parseInt(
                                                    orderDetail.total_price.toString()
                                                ).toFixed(2)}
                                            </TableCell>
                                            <TableCell>
                                                {orderDetail.status}
                                            </TableCell>
                                            <TableCell className="lg:table-cell hidden">
                                                {new Date(
                                                    orderDetail.date
                                                ).toLocaleString()}
                                            </TableCell>
                                            <TableCell className="table-cell md:hidden">
                                                <EditOrderDetailStatusMoblie
                                                    currentStatus={
                                                        orderDetail.status
                                                    }
                                                    totalPrice={
                                                        orderDetail.total_price
                                                    }
                                                    orderDetailId={
                                                        orderDetail.id
                                                    }
                                                    status={currentStatus}
                                                    date={orderDetail.date}
                                                    setStatus={(newStatus) =>
                                                        handleStatusChange(
                                                            orderDetail.id,
                                                            newStatus as OrderDetailsStatus
                                                        )
                                                    }
                                                    fetchAllOrderDetails={
                                                        fetchAllOrderDetails
                                                    }
                                                />
                                                <Button
                                                    variant="outline"
                                                    className="rounded-xl"
                                                    onClick={() =>
                                                        router.push(
                                                            `/admin/orderDetails/items/${orderDetail.id}`
                                                        )
                                                    }
                                                >
                                                    Items
                                                </Button>
                                            </TableCell>
                                            <TableCell className="md:table-cell hidden">
                                                <EditOrderDetailStatus
                                                    currentStatus={
                                                        orderDetail.status
                                                    }
                                                    orderDetailId={
                                                        orderDetail.id
                                                    }
                                                    status={currentStatus}
                                                    setStatus={(newStatus) =>
                                                        handleStatusChange(
                                                            orderDetail.id,
                                                            newStatus as OrderDetailsStatus
                                                        )
                                                    }
                                                    fetchAllOrderDetails={
                                                        fetchAllOrderDetails
                                                    }
                                                />
                                                <Button
                                                    variant="outline"
                                                    className="rounded-xl"
                                                    onClick={() =>
                                                        router.push(
                                                            `/admin/orderDetails/items/${orderDetail.id}`
                                                        )
                                                    }
                                                >
                                                    Items
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrderDetailsDashBoard;
