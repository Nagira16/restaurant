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
router.get("/:id", getTableById);
router.post("/", createTable);
router.put("/:id", updateTable);
router.delete("/:id", deleteTable);

export default router;
