"use client";

import { adminDeleteById } from "@/actions";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Endpoint, FetchData, Review, ReviewWithUserMenuName } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AdminReviewsDashBoard = (): JSX.Element => {
    const [allReviews, setAllreviews] = useState<ReviewWithUserMenuName[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router: AppRouterInstance = useRouter();
    const { getToken } = useAuth();

    const fetchAllReviews = async (): Promise<void> => {
        const token: string | null = await getToken();
        if (!token) return;

        const res: Response = await fetch(
            "http://localhost:3001/admin/reviews",
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
            const result = data.results as ReviewWithUserMenuName[];
            setAllreviews(result);
            setIsLoading(false);
        } else {
            Swal.fire({
                title: data.message,
                icon: "error"
            });
        }
    };

    const handleDelete = async (reviewId: string) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this review?"
        );

        if (!confirmDelete) return alert("Action Canceled");

        try {
            const token: string | null = await getToken();
            if (!token) return;

            const deletedReview = await adminDeleteById<Review | null>(
                token,
                Endpoint.reviews,
                reviewId
            );

            if (deletedReview) {
                fetchAllReviews();
                Swal.fire({
                    title: "Review Deleted Successfully",
                    icon: "success"
                });
            } else {
                Swal.fire({
                    title: "Failed To Delete Review",
                    icon: "warning"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "An Error Occurred While Deleting The Review",
                icon: "error"
            });
        }
    };

    useEffect(() => {
        fetchAllReviews();
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
                <>
                    <div className="flex items-center sm:justify-between flex-wrap">
                        <h1 className="text-3xl font-bold mb-4">
                            Review Management
                        </h1>
                    </div>
                    <div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order</TableHead>
                                    <TableHead>Menu Name</TableHead>
                                    <TableHead className="lg:table-cell hidden">
                                        User Name
                                    </TableHead>
                                    <TableHead>Rating</TableHead>
                                    <TableHead className="lg:table-cell hidden">
                                        Comments
                                    </TableHead>
                                    <TableHead className="lg:table-cell hidden">
                                        Created At
                                    </TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {allReviews.map((review, i) => (
                                    <TableRow key={review.id}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>
                                            {review.menu.name}
                                        </TableCell>
                                        <TableCell className="lg:table-cell hidden">
                                            {review.user.name}
                                        </TableCell>
                                        <TableCell>{review.stars}</TableCell>
                                        <TableCell className="lg:table-cell hidden">
                                            {review.comments}
                                        </TableCell>
                                        <TableCell className="lg:table-cell hidden">
                                            {new Date(
                                                review.created_at
                                            ).toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outline"
                                                className="rounded-xl"
                                                onClick={() =>
                                                    handleDelete(review.id)
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminReviewsDashBoard;
