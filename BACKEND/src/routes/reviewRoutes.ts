import { Router } from "express";
import {
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
    getAllReviewsByMenuId,
    getRatesByMenuId
} from "../controllers/reviewController";

const router = Router();

router.get("/rate/:id", getRatesByMenuId);
router.post("/", createReview);
router.get("/:id", getAllReviewsByMenuId);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

export default router;
