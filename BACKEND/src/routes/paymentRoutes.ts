import { Router } from "express";
import {
    getAllPaymentsByUserId,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment
} from "../controllers/paymentController";

const router = Router();

router.get("/", getAllPaymentsByUserId);
router.post("/", createPayment);
router.get("/:id", getPaymentById);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);

export default router;
