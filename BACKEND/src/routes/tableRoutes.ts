import { Router } from "express";
import {
    getAllTables,
    getTableById,
    createTable,
    updateTable,
    deleteTable
} from "../controllers/tableController";

const router = Router();

router.get("/", getAllTables);
// router.post("/", createTable); // admin only
router.get("/:id", getTableById);
// router.put("/:id", updateTable); // admin only
// router.delete("/:id", deleteTable); // admin only

export default router;
