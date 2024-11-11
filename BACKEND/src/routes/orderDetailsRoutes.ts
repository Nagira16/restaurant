import { Router } from "express";
import {
    getAllOrderDetailsByUserId,
    getOrderDetailsById,
    createOrderDetails,
    updateOrderDetails,
    deleteOrderDetails
} from "../controllers/orderDetailsController";

const router = Router();

router.get("/", getAllOrderDetailsByUserId);
router.post("/", createOrderDetails);
router.get("/:id", getOrderDetailsById);
router.put("/:id", updateOrderDetails);
router.delete("/:id", deleteOrderDetails);

export default router;
