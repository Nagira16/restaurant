"use client";

import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { FetchData, Reservation } from "@/types";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";

const BookTableHistory = () => {
    const { getToken } = useAuth();
    const [reservations, setReservations] = useState<Reservation[]>([]);

    const fetchReservations = async () => {
        const token: string | null = await getToken();
        if (!token) return;

        const res: Response = await fetch(
            "http://localhost:3001/reservations",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data: FetchData = await res.json();

        if (data.results) {
            setReservations(data.results as Reservation[]);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

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
                            <TableHead>Location</TableHead>
                            <TableHead className="text-right">
                                Number Of People
                            </TableHead>
                            <TableHead className="text-right">
                                Reservation Date
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reservations.map((reservation, i) => (
                            <TableRow key={reservation.id} className="h-[80px]">
                                <TableCell className="font-medium">
                                    <Link
                                        href={`/book-table/history/${reservation.id}`}
                                    >
                                        {i + 1}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link
                                        href={`/book-table/history/${reservation.id}`}
                                    >
                                        <Badge
                                            variant="secondary"
                                            className={getStatusColor(
                                                reservation.status
                                            )}
                                        >
                                            {reservation.status}
                                        </Badge>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link
                                        href={`/book-table/history/${reservation.id}`}
                                    >
                                        {reservation.location}
                                    </Link>
                                </TableCell>
                                <TableCell className="text-right font-medium">
                                    <Link
                                        href={`/book-table/history/${reservation.id}`}
                                    >
                                        {reservation.num_of_people}
                                    </Link>
                                </TableCell>
                                <TableCell className="text-right text-muted-foreground">
                                    <Link
                                        href={`/book-table/history/${reservation.id}`}
                                    >
                                        {new Date(
                                            reservation.reservationDateTime
                                        ).toLocaleString()}
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

export default BookTableHistory;
