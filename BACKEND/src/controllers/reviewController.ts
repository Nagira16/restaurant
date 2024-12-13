import { Review, User } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import { findUserByClerkId } from "./userController";
import { ReviewWithUser, ReviewWithUserMenuName } from "../types";

export const getAllReviews = async (
    _: Request,
    res: Response
): Promise<void> => {
    try {
        const allReviews: ReviewWithUserMenuName[] =
            await prisma.review.findMany({
                include: {
                    user: {
                        select: {
                            name: true
                        }
                    },
                    menu: {
                        select: {
                            name: true
                        }
                    }
                }
            });

        res.status(200).json({
            results: allReviews,
            message: "Reviews Found Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Failed",
            success: false
        });
    }
};

export const getAllReviewsByMenuId = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const menu_id: string = req.params.id;

        const allReviews: ReviewWithUser[] = await prisma.review.findMany({
            where: { menu_id },
            include: {
                user: {
                    select: {
                        name: true,
                        image: true
                    }
                }
            }
        });

        res.status(200).json({
            results: allReviews,
            message: "Reviews Found Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Failed",
            success: false
        });
    }
};

export const getReviewById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;

        const review: Review | null = await prisma.review.findUnique({
            where: { id }
        });

        if (review) {
            res.status(200).json({
                results: review,
                message: "Review Found Successfully",
                success: true
            });
        } else {
            res.status(404).json({
                results: review,
                message: "Review Not Found",
                success: false
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Failed",
            success: false
        });
    }
};

export const createReview = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {
            menu_id,
            rating,
            comments
        }: { menu_id: string; rating: number; comments?: string } = req.body;

        const user: User | null = await findUserByClerkId(req);

        if (!user) {
            res.status(404).json({
                results: null,
                message: "User Not Found",
                success: false
            });
            return;
        }

        if (rating > 5) {
            res.status(404).json({
                results: null,
                message: "Input Error Stars ",
                success: false
            });
            return;
        }

        const newReview: ReviewWithUser = await prisma.review.create({
            data: {
                user_id: user.id,
                menu_id,
                stars: rating,
                comments
            },
            include: {
                user: {
                    select: {
                        name: true,
                        image: true
                    }
                }
            }
        });

        res.status(201).json({
            results: newReview,
            message: "Review Created Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Failed",
            success: false
        });
    }
};

export const updateReview = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;
        const { rating, comments }: { rating?: number; comments?: string } =
            req.body;

        const review: Review | null = await prisma.review.findUnique({
            where: { id }
        });

        if (!review) {
            res.status(404).json({
                results: review,
                message: "Review Not Found",
                success: false
            });
            return;
        }

        const updatedReview: Review = await prisma.review.update({
            where: { id: review.id },
            data: {
                stars: rating || review.stars,
                comments: comments || review.comments
            }
        });

        res.status(200).json({
            results: updatedReview,
            message: "Review Updated Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Failed",
            success: false
        });
    }
};

export const deleteReview = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;
        const review: Review | null = await prisma.review.findUnique({
            where: { id }
        });

        if (!review) {
            res.status(404).json({
                results: review,
                message: "Review Not Found",
                success: false
            });
            return;
        }

        const deletedReview: Review = await prisma.review.delete({
            where: { id: review.id }
        });

        res.status(200).json({
            results: deletedReview,
            message: "Review Deleted Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Failed",
            success: false
        });
    }
};

export const getRatesByMenuId = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const menu_id: string = req.params.id;

        const allReviews: Review[] = await prisma.review.findMany({
            where: {
                menu_id
            }
        });

        const totalStars: number = allReviews.reduce(
            (prev, curr) => prev + curr.stars,
            0
        );

        const averageRating: number | null = totalStars / allReviews.length;

        res.status(200).json({
            results: averageRating || 0,
            counts: allReviews.length || 0,
            message: "Rating Found Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Failed",
            success: false
        });
    }
};
