import { Router } from "express";
import { getAllUsers } from "../controllers/userController";
import {
    createMenu,
    deleteMenu,
    updateMenu
} from "../controllers/menuController";

const router = Router();

// http://localhost:3001/admin

router.get("/users", getAllUsers);

router.post("/menus/:id", createMenu);
router.put("/menus/:id", updateMenu);
router.delete("/menus/:id", deleteMenu);

export default router;
