import { Router } from "express";
import {
    getAllItemOrderDetailsByOrderId,
    getItemOrderDetailsById,
    createItemOrderDetails,
    updateItemOrderDetails,
    deleteItemOrderDetails
} from "../controllers/itemOrderDetailsController";

const router = Router();

router.get("/", getAllItemOrderDetailsByOrderId);
router.post("/", createItemOrderDetails);
router.get("/:id", getItemOrderDetailsById);
router.put("/:id", updateItemOrderDetails);
router.delete("/:id", deleteItemOrderDetails);

export default router;
