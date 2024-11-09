import { Router } from "express";
import {
    getAllReviewsByMenu,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
} from "../controllers/reviewController";

const router = Router();

router.get("/", getAllReviewsByMenu);
router.post("/", createReview);
router.get("/:id", getReviewById);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

export default router;
