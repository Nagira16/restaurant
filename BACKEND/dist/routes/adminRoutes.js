"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const menuController_1 = require("../controllers/menuController");
const router = (0, express_1.Router)();
// http://localhost:3001/admin
router.get("/users", userController_1.getAllUsers);
router.post("/menus/:id", menuController_1.createMenu);
router.put("/menus/:id", menuController_1.updateMenu);
router.delete("/menus/:id", menuController_1.deleteMenu);
exports.default = router;
