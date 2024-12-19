"use client";

import { getAllTablesById } from "@/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Endpoint, Reservation } from "@/types";
import { format } from "date-fns";
import {
    AlertCircle,
    Calendar,
    CheckCircle,
    Clock,
    MapPin,
    Users
} from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ReservationSuccessPage = ({ id }: { id: string }) => {
    const [reservation, setReservation] = useState<Reservation | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router: AppRouterInstance = useRouter();

    const fetchReservation = async (id: string) => {
        try {
            const result = await getAllTablesById<Reservation>(
                Endpoint.reservations,
                id
            );

            if (result) {
                console.log(result);

                setReservation(result);
            }
        } catch (err) {
            console.error("Error fetching reservation:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchReservation(id);
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin h-16 w-16 border-4 border-t-transparent border-blue-500 rounded-full"></div>
            </div>
        );
    }

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
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <Card className="w-full max-w-2xl">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle
                            className="h-10 w-10 text-green-600"
                            aria-label="Reservation successful"
                        />
                    </div>
                    <CardTitle className="text-3xl font-bold">
                        Reservation Successful!
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-xl font-semibold">
                            Reservation Details:
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <MapPin className="mr-2 h-5 w-5 text-gray-500" />
                                <span className="font-medium">Table ID:</span>
                                <span className="ml-2">
                                    {reservation?.table_id}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <MapPin className="mr-2 h-5 w-5 text-gray-500" />
                                <span className="font-medium">Location:</span>
                                <span className="ml-2">
                                    {reservation?.location}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <Users className="mr-2 h-5 w-5 text-gray-500" />
                                <span className="font-medium">
                                    Number of People:
                                </span>
                                <span className="ml-2">
                                    {reservation?.num_of_people}{" "}
                                    {reservation?.num_of_people === 1
                                        ? "person"
                                        : "people"}
                                </span>
                            </div>
                            {reservation?.reservationDateTime && (
                                <>
                                    <div className="flex items-center">
                                        <Calendar className="mr-2 h-5 w-5 text-gray-500" />
                                        <span className="font-medium">
                                            Date:
                                        </span>
                                        <span className="ml-2">
                                            {format(
                                                new Date(
                                                    reservation.reservationDateTime
                                                ),
                                                "MMMM d, yyyy"
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="mr-2 h-5 w-5 text-gray-500" />
                                        <span className="font-medium">
                                            Time:
                                        </span>
                                        <span className="ml-2">
                                            {format(
                                                new Date(
                                                    reservation.reservationDateTime
                                                ),
                                                "h:mm a"
                                            )}
                                        </span>
                                    </div>
                                </>
                            )}
                            <div className="flex items-center">
                                <AlertCircle className="mr-2 h-5 w-5 text-gray-500" />
                                <span className="font-medium">Status:</span>
                                <Badge
                                    variant="secondary"
                                    className={getStatusColor(
                                        reservation?.status!
                                    )}
                                >
                                    {reservation?.status}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center gap-4">
                    <Button variant="outline" asChild>
                        <Link href="/">Go back to home</Link>
                    </Button>
                    <Button
                        asChild
                        className="bg-red-500 hover:bg-red-700 text-white"
                    >
                        <Link href="/book-table">Make a new reservation</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default ReservationSuccessPage;
