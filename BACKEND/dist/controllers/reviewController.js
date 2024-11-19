"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.createReview = exports.getReviewById = exports.getAllReviewsByMenuId = exports.getAllReviews = void 0;
const prismaClient_1 = require("../prismaClient");
const userController_1 = require("./userController");
const getAllReviews = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allReviews = yield prismaClient_1.prisma.review.findMany();
        res.status(200).json({
            results: allReviews,
            message: "Reviews Found Successfully",
            success: true
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Failed",
            success: false
        });
    }
});
exports.getAllReviews = getAllReviews;
const getAllReviewsByMenuId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { menu_id } = req.body;
        const allReviews = yield prismaClient_1.prisma.review.findMany({
            where: { menu_id }
        });
        res.status(200).json({
            results: allReviews,
            message: "Reviews Found Successfully",
            success: true
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Failed",
            success: false
        });
    }
});
exports.getAllReviewsByMenuId = getAllReviewsByMenuId;
const getReviewById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const review = yield prismaClient_1.prisma.review.findUnique({
            where: { id }
        });
        if (review) {
            res.status(200).json({
                results: review,
                message: "Review Found Successfully",
                success: true
            });
        }
        else {
            res.status(404).json({
                results: review,
                message: "Review Not Found",
                success: false
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Failed",
            success: false
        });
    }
});
exports.getReviewById = getReviewById;
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { menu_id, stars, comments } = req.body;
        const user = yield (0, userController_1.findUserByClerkId)(req);
        if (!user) {
            res.status(404).json({
                results: null,
                message: "User Not Found",
                success: false
            });
            return;
        }
        const newReview = yield prismaClient_1.prisma.review.create({
            data: {
                user_id: user.id,
                menu_id,
                stars,
                comments
            }
        });
        res.status(201).json({
            results: newReview,
            message: "Review Created Successfully",
            success: true
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Failed",
            success: false
        });
    }
});
exports.createReview = createReview;
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { stars, comments } = req.body;
        const review = yield prismaClient_1.prisma.review.findUnique({
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
        const updatedReview = yield prismaClient_1.prisma.review.update({
            where: { id: review.id },
            data: {
                stars: stars || review.stars,
                comments: comments || review.comments
            }
        });
        res.status(200).json({
            results: updatedReview,
            message: "Review Updated Successfully",
            success: true
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Failed",
            success: false
        });
    }
});
exports.updateReview = updateReview;
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const review = yield prismaClient_1.prisma.review.findUnique({
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
        const deletedReview = yield prismaClient_1.prisma.review.delete({
            where: { id: review.id }
        });
        res.status(200).json({
            results: deletedReview,
            message: "Review Deleted Successfully",
            success: true
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Failed",
            success: false
        });
    }
});
exports.deleteReview = deleteReview;
