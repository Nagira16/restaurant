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
import { getAllReviews } from "../controllers/reviewController";
import { getAllReservations } from "../controllers/reservationController";
// import { getAllReservations } from "../controllers/reservationController";

const router = Router();

// http://localhost:3001/admin

router.get("/users", getAllUsers);

router.post("/menus/:id", createMenu);
router.put("/menus/:id", updateMenu);
router.delete("/menus/:id", deleteMenu);

router.post("/tables", createTable);
router.put("/tables/:id", updateTable);
router.delete("/tables/:id", deleteTable);

router.get("/roles", getAllRoles);
router.post("/roles", createRole);
router.get("/roles/:id", getRoleById);
router.put("/roles/:id", updateRole);
router.delete("/roles/:id", deleteRole);

router.get("/reviews", getAllReviews);

router.get("/reservations", getAllReservations);

router.get("/", (_: Request, res: Response) => {
    res.status(200).json({ message: "Work Admin Routes" });
});
export default router;
