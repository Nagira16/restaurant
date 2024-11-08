import { Request, Response, Router } from "express";
import { getAllUsers } from "../controllers/userController";
import {
    createMenu,
    deleteMenu,
    updateMenu
} from "../controllers/menuController";
import {
    createTable,
    deleteTable,
    updateTable
} from "../controllers/tableController";
import {
    createRole,
    deleteRole,
    getAllRoles,
    getRoleById,
    updateRole
} from "../controllers/roleController";

const router = Router();

// http://localhost:3001/admin

router.get("/users", getAllUsers);

router.post("/menus/:id", createMenu);
router.put("/menus/:id", updateMenu);
router.delete("/menus/:id", deleteMenu);

router.post("/table", createTable);
router.put("/table/:id", updateTable);
router.delete("/table/:id", deleteTable);

router.get("/role", getAllRoles);
router.post("/role", createRole);
router.get("/role/:id", getRoleById);
router.put("/role/:id", updateRole);
router.delete("/role/:id", deleteRole);

router.get("/", (_: Request, res: Response) => {
    res.status(200).json({ message: "Work Admin Routes" });
});
export default router;
