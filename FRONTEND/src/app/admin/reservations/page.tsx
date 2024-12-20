"use client";

import EditReservationStatus from "@/components/EditReservationStatus";
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
    Reservation,
    ReservationStatus,
    ReservationWithUserNameTableNumber
} from "@/types";
import { useAuth } from "@clerk/nextjs";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AdminReservationsDashBoard = (): JSX.Element => {
    const [allReservations, setAllReservations] = useState<
        ReservationWithUserNameTableNumber[]
    >([]);
    const [statusMap, setStatusMap] = useState<
        Map<string, ReservationStatus | null>
    >(new Map());
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { getToken } = useAuth();

    const fetchAllReservations = async (): Promise<void> => {
        const token: string | null = await getToken();
        if (!token) return;

        const res: Response = await fetch(
            "http://localhost:3001/admin/reservations",
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
            const result = data.results as ReservationWithUserNameTableNumber[];
            setAllReservations(result);
            const newStatusMap = new Map<string, ReservationStatus | null>();
            result.forEach((reservation) => {
                newStatusMap.set(reservation.id, reservation.status);
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
        fetchAllReservations();
    }, []);

    const handleStatusChange = (
        reservationId: string,
        newStatus: ReservationStatus
    ) => {
        setStatusMap((prev) => {
            const updatedMap = new Map(prev);
            updatedMap.set(reservationId, newStatus);
            return updatedMap;
        });
    };

    return (
        <div>
            {isLoading ? (
                <>
                    <div className="min-h-screen grid place-content-center animate-pulse">
                        Loading...
                    </div>
                </>
            ) : (
                <>
                    <div className="flex items-center sm:justify-between flex-wrap">
                        <h1 className="text-3xl font-bold mb-4">
                            Reservations Management
                        </h1>
                    </div>
                    <div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order</TableHead>
                                    <TableHead>User Name</TableHead>
                                    <TableHead>Table Number</TableHead>
                                    <TableHead className="lg:table-cell hidden">
                                        Num Of People
                                    </TableHead>
                                    <TableHead className="lg:table-cell hidden">
                                        Status
                                    </TableHead>
                                    <TableHead>Reservartion Date</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Create At</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {allReservations.map((reservation, i) => {
                                    const currentStatus =
                                        statusMap.get(reservation.id) ||
                                        reservation.status;

                                    return (
                                        <TableRow key={reservation.id}>
                                            <TableCell>{i + 1}</TableCell>
                                            <TableCell>
                                                {reservation.user.name}
                                            </TableCell>
                                            <TableCell>
                                                {reservation.table?.number}
                                            </TableCell>
                                            <TableCell className="lg:table-cell hidden">
                                                {reservation.num_of_people}
                                            </TableCell>
                                            <TableCell className="lg:table-cell hidden">
                                                {reservation.status}
                                            </TableCell>
                                            <TableCell className="lg:table-cell hidden">
                                                {new Date(
                                                    reservation.reservationDateTime
                                                ).toLocaleString()}
                                            </TableCell>
                                            <TableCell className="lg:table-cell hidden">
                                                {reservation.location}
                                            </TableCell>
                                            <TableCell className="lg:table-cell hidden">
                                                {new Date(
                                                    reservation.created_at
                                                ).toLocaleString()}
                                            </TableCell>
                                            <TableCell>
                                                <EditReservationStatus
                                                    currentStatus={
                                                        reservation.status
                                                    }
                                                    reservationId={
                                                        reservation.id
                                                    }
                                                    status={currentStatus}
                                                    setStatus={(newStatus) =>
                                                        handleStatusChange(
                                                            reservation.id,
                                                            newStatus as ReservationStatus
                                                        )
                                                    }
                                                    fetchAllReservations={
                                                        fetchAllReservations
                                                    }
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminReservationsDashBoard;
