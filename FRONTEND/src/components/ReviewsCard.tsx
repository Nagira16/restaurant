"use client";

import { FormEvent, useEffect, useState } from "react";
import {
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
    CardFooter
} from "./ui/card";
import { Endpoint, Review } from "@/types";
import "@smastrom/react-rating/style.css";
import { Rating } from "@smastrom/react-rating";
import ReviewForm from "./ReviewForm";
import { createNewReview, getAllTablesById } from "@/actions";
import { useAuth } from "@clerk/nextjs";

type ReviewsProp = {
    menu_id: string;
};

const Reviews = ({ menu_id }: ReviewsProp): JSX.Element => {
    const { getToken } = useAuth();
    const [reviews, setReviews] = useState<Review[] | null>([]);
    const [rating, setRating] = useState<number>(0);
    const [comments, setComments] = useState<string>("");

    const fetchAllReview = async () => {
        const allReviews = await getAllTablesById<Review[] | null>(
            Endpoint.reviews,
            menu_id
        );
        setReviews(allReviews);
    };

    useEffect(() => {
        fetchAllReview();
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const token: string | null = await getToken();
        if (token) {
            console.log(token);
            await createNewReview(token, menu_id, rating, comments);
        }
    };
    return (
        <>
            {reviews && (
                <div className="w-[450px] space-y-2">
                    <CardHeader>
                        <CardTitle className="text-4xl">Reviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {reviews.length < 0 && (
                            <CardDescription className="h-32 ">
                                {reviews.map((r) => (
                                    <div>
                                        <Rating
                                            value={r.stars}
                                            readOnly
                                            className="max-w-[150px]"
                                        />
                                        <p>{r.comments}</p>
                                    </div>
                                ))}
                            </CardDescription>
                        )}
                    </CardContent>
                    <CardFooter>
                        <ReviewForm
                            rating={rating}
                            setRating={setRating}
                            setComments={setComments}
                            handleSubmit={handleSubmit}
                        />
                    </CardFooter>
                </div>
            )}
        </>
    );
};

export default Reviews;
