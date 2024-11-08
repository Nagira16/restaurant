"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const menuController_1 = require("../controllers/menuController");
const router = (0, express_1.Router)();
router.get("/", menuController_1.getAllMenus);
// router.post("/", createMenu); // admin only
router.get("/:id", menuController_1.getMenuById);
// router.put("/:id", updateMenu); // admin only
// router.delete("/:id", deleteMenu); // admin only
exports.default = router;
