import { Router } from "express";
import {
    getAllItemOrderDetails,
    getItemOrderDetailsById,
    createItemOrderDetails,
    updateItemOrderDetails,
    deleteItemOrderDetails
} from "../controllers/itemOrderDetailsController";

const router = Router();

router.get("/", getAllItemOrderDetails);
router.get("/:id", getItemOrderDetailsById);
router.post("/", createItemOrderDetails);
router.put("/:id", updateItemOrderDetails);
router.delete("/:id", deleteItemOrderDetails);

export default router;
