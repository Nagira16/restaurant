"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentController_1 = require("../controllers/paymentController");
const router = (0, express_1.Router)();
router.get("/", paymentController_1.getAllPaymentsByUserId);
router.post("/", paymentController_1.createPayment);
router.get("/:id", paymentController_1.getPaymentById);
router.put("/:id", paymentController_1.updatePayment);
router.delete("/:id", paymentController_1.deletePayment);
exports.default = router;
