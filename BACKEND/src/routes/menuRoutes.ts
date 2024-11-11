import { Router } from "express";
import {
    getAllMenus,
    getMenuById,
    createMenu,
    updateMenu,
    deleteMenu
} from "../controllers/menuController";

const router = Router();

router.get("/", getAllMenus);
// router.post("/", createMenu); // admin only
router.get("/:id", getMenuById);
// router.put("/:id", updateMenu); // admin only
// router.delete("/:id", deleteMenu); // admin only

export default router;
