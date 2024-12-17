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
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AdminOrderDetailsDashBoard = (): JSX.Element => {
    const [status, setStatus] = useState<OrderDetailsStatus | null>(null);
    const [allOrderDetails, setOrderDetails] = useState<
        Order_DetailsWithUserName[]
    >([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { getToken } = useAuth();

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
            result.map((orderDetails) => {
                setStatus(orderDetails.status);
            });
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

    return (
        <div>
            {isLoading ? (
                <>
                    <div className="min-h-screen grid place-content-center animate-pulse">
                        Loading...
                    </div>
                </>
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
                                {allOrderDetails.map((orderDetail, index) => (
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
                                                totalPrice={
                                                    orderDetail.total_price
                                                }
                                                orderDetailId={orderDetail.id}
                                                status={orderDetail.status}
                                                date={orderDetail.date}
                                                setStatus={setStatus}
                                                fetchAllOrderDetails={
                                                    fetchAllOrderDetails
                                                }
                                            />
                                        </TableCell>
                                        <TableCell className="md:table-cell hidden">
                                            <EditOrderDetailStatus
                                                orderDetailId={orderDetail.id}
                                                status={orderDetail.status}
                                                setStatus={setStatus}
                                                fetchAllOrderDetails={
                                                    fetchAllOrderDetails
                                                }
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrderDetailsDashBoard;
