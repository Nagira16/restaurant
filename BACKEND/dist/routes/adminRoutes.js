"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const menuController_1 = require("../controllers/menuController");
const tableController_1 = require("../controllers/tableController");
const roleController_1 = require("../controllers/roleController");
const reviewController_1 = require("../controllers/reviewController");
const reservationController_1 = require("../controllers/reservationController");
const nutrientsController_1 = require("../controllers/nutrientsController");
const categoryController_1 = require("../controllers/categoryController");
const orderDetailsController_1 = require("../controllers/orderDetailsController");
const itemOrderDetailsController_1 = require("../controllers/itemOrderDetailsController");
// import { getAllReservations } from "../controllers/reservationController";
const router = (0, express_1.Router)();
// http://localhost:3001/admin
router.get("/", (_, res) => {
    res.status(200).json({
        results: null,
        message: "User Auth",
        success: true
    });
});
router.get("/users", userController_1.getAllUsers);
router.get("/menus", menuController_1.getAllMenusWithCategoryName);
router.post("/menus", menuController_1.createMenu);
router.get("/menus/:id", menuController_1.getMenuWithCategoryNameById);
router.put("/menus/:id", menuController_1.updateMenu);
router.delete("/menus/:id", menuController_1.deleteMenu);
router.post("/tables", tableController_1.createTable);
router.put("/tables/:id", tableController_1.updateTable);
router.delete("/tables/:id", tableController_1.deleteTable);
router.get("/roles", roleController_1.getAllRolesWithUsers);
router.post("/roles", roleController_1.createRole);
router.put("/roles/:id", roleController_1.updateRole);
router.delete("/roles/:id", roleController_1.deleteRole);
router.get("/reviews", reviewController_1.getAllReviews);
router.get("/reservations", reservationController_1.getAllReservations);
router.get("/orderDetails", orderDetailsController_1.getAllOrderDetails);
router.get("/nutrients", nutrientsController_1.getAllNutrients);
router.post("/nutrients", nutrientsController_1.createNutrient);
router.get("/nutrients/:id", nutrientsController_1.getNutrientById);
router.put("/nutrients/:id", nutrientsController_1.updateNutrient);
router.delete("/nutrients/:id", nutrientsController_1.deleteNutrient);
router.get("/categories", categoryController_1.getAllCategories);
router.post("/category", categoryController_1.createCategory);
router.get("/category/:id", categoryController_1.getCategoryById);
router.put("/category/:id", categoryController_1.updateCategory);
router.delete("/category/:id", categoryController_1.deleteCategory);
router.get("/itemOrderDetails", itemOrderDetailsController_1.getAllItemOrderDetails);
exports.default = router;
