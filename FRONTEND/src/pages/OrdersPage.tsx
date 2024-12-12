"use client";

import { getAllOrderDetails } from "@/actions";
import {
    Table,
    TableCaption,
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

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent orders.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Id</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orderDetails.map((order, i) => (
                        <TableRow key={order.id}>
                            <TableCell className="font-medium">
                                <Link href={`orders/${order.id}`} passHref>
                                    {i + 1}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link href={`orders/${order.id}`} passHref>
                                    {order.status}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link href={`orders/${order.id}`} passHref>
                                    $
                                    {parseFloat(
                                        order.total_price.toString()
                                    ).toFixed(2)}
                                </Link>
                            </TableCell>
                            <TableCell className="text-right">
                                <Link href={`orders/${order.id}`} passHref>
                                    {new Date(order.date).toLocaleString()}
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default OrdersPage;
