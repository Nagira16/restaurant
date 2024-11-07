import { Router } from "express";
import {
    getAllOrderDetails,
    getOrderDetailsById,
    createOrderDetails,
    updateOrderDetails,
    deleteOrderDetails
} from "../controllers/orderDetailsController";

const router = Router();

router.get("/", getAllOrderDetails);
router.get("/:id", getOrderDetailsById);
router.post("/", createOrderDetails);
router.put("/:id", updateOrderDetails);
router.delete("/:id", deleteOrderDetails);

export default router;
