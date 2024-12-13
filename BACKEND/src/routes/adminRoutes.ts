import { Request, Response, Router } from "express";
import { getAllUsers } from "../controllers/userController";
import {
    createMenu,
    deleteMenu,
    getAllMenusWithCategoryName,
    getMenuWithCategoryNameById,
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
    getAllRolesWithUsers,
    getRoleById,
    updateRole
} from "../controllers/roleController";
import { getAllReviews } from "../controllers/reviewController";
import { getAllReservations } from "../controllers/reservationController";
import {
    createNutrient,
    deleteNutrient,
    getAllNutrients,
    getNutrientById,
    updateNutrient
} from "../controllers/nutrientsController";
import {
    createCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
    updateCategory
} from "../controllers/categoryController";
import { getAllOrderDetails } from "../controllers/orderDetailsController";
import { getAllItemOrderDetails } from "../controllers/itemOrderDetailsController";
// import { getAllReservations } from "../controllers/reservationController";

const router = Router();

// http://localhost:3001/admin

router.get("/", (_: Request, res: Response) => {
    res.status(200).json({
        results: null,
        message: "User Auth",
        success: true
    });
});

router.get("/users", getAllUsers);

router.get("/menus", getAllMenusWithCategoryName);
router.post("/menus", createMenu);
router.get("/menus/:id", getMenuWithCategoryNameById);
router.put("/menus/:id", updateMenu);
router.delete("/menus/:id", deleteMenu);

router.post("/tables", createTable);
router.put("/tables/:id", updateTable);
router.delete("/tables/:id", deleteTable);

router.get("/roles", getAllRolesWithUsers);
router.post("/roles", createRole);
router.put("/roles/:id", updateRole);
router.delete("/roles/:id", deleteRole);

router.get("/reviews", getAllReviews);

router.get("/reservations", getAllReservations);

router.get("/orderDetails", getAllOrderDetails);

router.get("/nutrients", getAllNutrients);
router.post("/nutrients", createNutrient);
router.get("/nutrients/:id", getNutrientById);
router.put("/nutrients/:id", updateNutrient);
router.delete("/nutrients/:id", deleteNutrient);

router.get("/categories", getAllCategories);
router.post("/category", createCategory);
router.get("/category/:id", getCategoryById);
router.put("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

router.get("/itemOrderDetails", getAllItemOrderDetails);

export default router;
