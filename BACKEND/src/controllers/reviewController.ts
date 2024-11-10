import { Review, User } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import { findUserByClerkId } from "./userController";

export const getAllReviews = async (
    _: Request,
    res: Response
): Promise<void> => {
    try {
        const allReviews: Review[] = await prisma.review.findMany();

        res.status(200).json({
            reviews: allReviews,
            message: "Reviews Found Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
};

export const getAllReviewsByMenuId = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { menu_id }: { menu_id: string } = req.body;

        const allReviews: Review[] = await prisma.review.findMany({
            where: { menu_id }
        });

        res.status(200).json({
            reviews: allReviews,
            message: "Reviews Found Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
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
                review,
                message: "Review Found Successfully",
                success: true
            });
        } else {
            res.status(404).json({
                review,
                message: "Review Not Found",
                success: false
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
};

export const createReview = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {
            menu_id,
            stars,
            comments
        }: { menu_id: string; stars: number; comments: string } = req.body;

        const user: User | null = await findUserByClerkId(req);

        if (!user) {
            res.status(404).json({ message: "User Not Found", success: false });
            return;
        }

        const newReview: Review = await prisma.review.create({
            data: {
                user_id: user.id,
                menu_id,
                stars,
                comments
            }
        });

        res.status(201).json({
            review: newReview,
            message: "Review Created Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
};

export const updateReview = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;
        const { stars, comments }: { stars?: number; comments?: string } =
            req.body;

        const review: Review | null = await prisma.review.findUnique({
            where: { id }
        });

        if (!review) {
            res.status(404).json({
                review,
                message: "Review Not Found",
                success: false
            });
            return;
        }

        const updatedReview: Review = await prisma.review.update({
            where: { id: review.id },
            data: {
                stars: stars || review.stars,
                comments: comments || review.comments
            }
        });

        res.status(200).json({
            review: updatedReview,
            message: "Review Updated Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
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
                review,
                message: "Review Not Found",
                success: false
            });
            return;
        }

        const deletedReview: Review = await prisma.review.delete({
            where: { id: review.id }
        });

        res.status(200).json({
            review: deletedReview,
            message: "Review Deleted Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
};
