"use client";

import { Label } from "@radix-ui/react-label";
import { Rating } from "@smastrom/react-rating";
import {
    ChangeEvent,
    Dispatch,
    FormEvent,
    SetStateAction,
    useState
} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

import { Input } from "./ui/input";
import { Button } from "./ui/button";

type ReviewFormProps = {
    rating: number;
    setRating: Dispatch<SetStateAction<number>>;
    setComments: Dispatch<SetStateAction<string>>;
    handleSubmit: (e: FormEvent) => void;
};

const ReviewForm = ({
    rating,
    setRating,
    setComments,
    handleSubmit
}: ReviewFormProps): JSX.Element => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-green-600 text-white rounded-2xl">
                    Write a Review
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Submit a Review</DialogTitle>
                    <DialogDescription>
                        Share your feedback and rating.
                    </DialogDescription>
                </DialogHeader>
                <form className="space-y-5">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label>Rating</Label>
                        <Rating
                            value={rating}
                            onChange={(newRating: number) =>
                                setRating(newRating)
                            }
                            className="max-w-[150px]"
                            isRequired
                        />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="review">Coments</Label>
                        <Input
                            type="text"
                            placeholder="Write your review here"
                            className=" border border-black p-10"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setComments(e.target.value)
                            }
                        />
                    </div>

                    <Button
                        className="bg-green-600 text-white rounded-2xl"
                        onClick={handleSubmit}
                    >
                        Submit Review
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ReviewForm;
