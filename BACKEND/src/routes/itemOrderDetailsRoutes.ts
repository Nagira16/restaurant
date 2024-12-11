import { Router } from "express";
import {
    getAllItemOrderDetailsByOrderId,
    createItemOrderDetails,
    updateItemOrderDetails,
    deleteItemOrderDetails
} from "../controllers/itemOrderDetailsController";

const router = Router();

router.post("/", createItemOrderDetails);
router.get("/:id", getAllItemOrderDetailsByOrderId);
router.put("/:id", updateItemOrderDetails);
router.delete("/:id", deleteItemOrderDetails);

export default router;
