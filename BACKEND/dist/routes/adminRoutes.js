"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const menuController_1 = require("../controllers/menuController");
const tableController_1 = require("../controllers/tableController");
const router = (0, express_1.Router)();
// http://localhost:3001/admin
router.get("/users", userController_1.getAllUsers);
router.post("/menus/:id", menuController_1.createMenu);
router.put("/menus/:id", menuController_1.updateMenu);
router.delete("/menus/:id", menuController_1.deleteMenu);
router.post("/table", tableController_1.createTable);
router.put("/table/:id", tableController_1.updateTable);
router.delete("/table/:id", tableController_1.deleteTable);
router.get("/", (_, res) => {
    res.status(200).json({ message: "Work Admin Routes" });
});
exports.default = router;
