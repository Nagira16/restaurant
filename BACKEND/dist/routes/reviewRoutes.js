"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviewController_1 = require("../controllers/reviewController");
const router = (0, express_1.Router)();
router.get("/", reviewController_1.getAllReviewsByMenu); // admin only
router.post("/", reviewController_1.createReview);
router.get("/:id", reviewController_1.getReviewById);
router.put("/:id", reviewController_1.updateReview);
router.delete("/:id", reviewController_1.deleteReview);
exports.default = router;
