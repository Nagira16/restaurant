import { Router } from "express";
import {
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
    getAllReviewsByMenuId,
    getStarsByMenuId
} from "../controllers/reviewController";

const router = Router();

router.get("/stars/:id", getStarsByMenuId);
router.post("/", createReview);
router.get("/:id", getAllReviewsByMenuId);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

export default router;
