"use client";

import { FormEvent, useEffect, useState } from "react";
import { CardHeader, CardTitle, CardContent, CardDescription } from "./ui/card";
import { Endpoint, ReviewWithUser } from "@/types";
import "@smastrom/react-rating/style.css";
import { Rating } from "@smastrom/react-rating";
import ReviewForm from "./ReviewForm";
import { createNewReview, getAllTablesById } from "@/actions";
import { useAuth } from "@clerk/nextjs";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";

type ReviewsProp = {
    menu_id: string;
};

const Reviews = ({ menu_id }: ReviewsProp): JSX.Element => {
    const { getToken } = useAuth();
    const [reviews, setReviews] = useState<ReviewWithUser[]>([]);
    const [rating, setRating] = useState<number>(0);
    const [comments, setComments] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    const fetchAllReview = async () => {
        try {
            const allReviews = await getAllTablesById<ReviewWithUser[] | null>(
                Endpoint.reviews,
                menu_id
            );
            if (allReviews) {
                setReviews(allReviews);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllReview();
    }, [menu_id]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const token: string | null = await getToken();
        if (token) {
            const newReview: ReviewWithUser | null = await createNewReview(
                token,
                menu_id,
                rating,
                comments
            );
            if (newReview) {
                setReviews((prev) => [...prev, newReview]);
            }
        }
    };

    return (
        <div className="w-[310px] md:w-[400px] space-y-5 mx-auto">
            <CardHeader className=" grid grid-cols-1 space-y-5 md:space-y-0 md:grid-cols-2 w-[310px] md:w-[400px]">
                <CardTitle className="text-4xl">Reviews</CardTitle>
                <ReviewForm
                    rating={rating}
                    setRating={setRating}
                    setComments={setComments}
                    handleSubmit={handleSubmit}
                />
            </CardHeader>
            <CardContent>
                {loading ? (
                    <Skeleton className="h-[250px] w-full" />
                ) : (
                    reviews &&
                    (reviews.length === 0 ? (
                        <CardDescription className="h-[250px] w-full">
                            <p>No reviews yet.</p>
                        </CardDescription>
                    ) : (
                        <div className="h-[250px] w-full overflow-y-auto overflow-x-hidden">
                            {reviews.map((r) => (
                                <div
                                    key={r.id}
                                    className="my-1 p-2 w-full border"
                                >
                                    <div className="flex items-start justify-start ml-3 space-x-5">
                                        <Image
                                            src={
                                                r.user.image ||
                                                "https://cdn.iconscout.com/icon/free/png-256/free-user-icon-download-in-svg-png-gif-file-formats--profile-avatar-account-person-app-interface-pack-icons-1401302.png?f=webp&w=256"
                                            }
                                            alt="Profile"
                                            width={30}
                                            height={30}
                                            className="rounded-full"
                                        />

                                        <p>{r.user?.name || "Unknown User"}</p>
                                        <Rating
                                            value={r.stars}
                                            readOnly
                                            className="max-w-[90px]"
                                        />
                                    </div>

                                    <div className="flex items-center justify-start my-2 ml-3 break-words">
                                        <p className="my-3 w-full">
                                            {r.comments}
                                        </p>
                                    </div>

                                    <div className="flex items-end justify-end">
                                        <p>
                                            {new Date(
                                                r.created_at
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
                )}
            </CardContent>
        </div>
    );
};

export default Reviews;
