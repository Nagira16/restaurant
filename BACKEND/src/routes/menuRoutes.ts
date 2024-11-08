import { Router } from "express";
import {
    getAllMenus,
    getMenuById,
    createMenu,
    updateMenu,
    deleteMenu
} from "../controllers/menuController";
import { adminMiddleware } from "../middleware";

const router = Router();

router.get("/", getAllMenus);
router.post("/", adminMiddleware, createMenu);
router.get("/:id", getMenuById);
router.put("/:id", adminMiddleware, updateMenu);
router.delete("/:id", adminMiddleware, deleteMenu);

export default router;
