"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const menuController_1 = require("../controllers/menuController");
const tableController_1 = require("../controllers/tableController");
const roleController_1 = require("../controllers/roleController");
const router = (0, express_1.Router)();
// http://localhost:3001/admin
router.get("/users", userController_1.getAllUsers);
router.post("/menus/:id", menuController_1.createMenu);
router.put("/menus/:id", menuController_1.updateMenu);
router.delete("/menus/:id", menuController_1.deleteMenu);
router.post("/tables", tableController_1.createTable);
router.put("/tables/:id", tableController_1.updateTable);
router.delete("/tables/:id", tableController_1.deleteTable);
router.get("/roles", roleController_1.getAllRoles);
router.post("/roles", roleController_1.createRole);
router.get("/roles/:id", roleController_1.getRoleById);
router.put("/roles/:id", roleController_1.updateRole);
router.delete("/roles/:id", roleController_1.deleteRole);
router.get("/", (_, res) => {
    res.status(200).json({ message: "Work Admin Routes" });
});
exports.default = router;
