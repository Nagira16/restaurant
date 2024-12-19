"use client";

import { getAllOrderDetails } from "@/actions";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableHeader,
    TableHead,
    TableRow,
    TableBody,
    TableCell
} from "@/components/ui/table";
import { Order_Details } from "@/types";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";

const OrdersPage = (): JSX.Element => {
    const { getToken } = useAuth();
    const [orderDetails, setOrderDetails] = useState<Order_Details[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAllOrders = async () => {
        const token: string | null = await getToken();
        if (token) {
            try {
                const allOrders: Order_Details[] | null =
                    await getAllOrderDetails(token);

                if (allOrders) {
                    setOrderDetails(allOrders);
                } else {
                    setError("No order data found.");
                }
            } catch (err) {
                setError("Failed to fetch order data.");
            } finally {
                setLoading(false);
            }
        } else {
            setError("Failed to retrieve authentication token.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen grid place-content-center animate-pulse">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500">
                <p>{error}</p>
                <button
                    onClick={fetchAllOrders}
                    className="mt-2 text-blue-500 hover:underline"
                >
                    Retry
                </button>
            </div>
        );
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "CAD"
        }).format(amount);
    };

    const getStatusColor = (status: string) => {
        const colors = {
            COMPLETED: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
            PENDING: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
            PREPARING: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
            PICKUP: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20"
        } as const;

        return (
            colors[status as keyof typeof colors] ||
            "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
        );
    };

    return (
        <div className="p-4 mx-auto max-w-5xl">
            <h1 className="text-3xl font-bold my-5">Order Details</h1>
            <div className="rounded-lg border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Id</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead className="text-right">Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orderDetails.map((order, i) => (
                            <TableRow key={order.id} className="h-[80px]">
                                <TableCell className="font-medium">
                                    <Link href={`/orders/${order.id}`}>
                                        {i + 1}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link href={`/orders/${order.id}`}>
                                        <Badge
                                            variant="secondary"
                                            className={getStatusColor(
                                                order.status
                                            )}
                                        >
                                            {order.status}
                                        </Badge>
                                    </Link>
                                </TableCell>
                                <TableCell className="text-right font-medium">
                                    <Link href={`/orders/${order.id}`}>
                                        {formatCurrency(order.total_price)}
                                    </Link>
                                </TableCell>
                                <TableCell className="text-right text-muted-foreground">
                                    <Link href={`/orders/${order.id}`}>
                                        {new Date(order.date).toLocaleString()}
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default OrdersPage;
