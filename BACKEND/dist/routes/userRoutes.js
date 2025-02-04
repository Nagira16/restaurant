"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// router.get("/", getAllUsers); // admin only
router.post("/", userController_1.createUser);
router.get("/clerk/:id", userController_1.getUserByClerkId);
router.get("/:id", userController_1.getUserById);
router.put("/:id", userController_1.updateUser);
router.delete("/:id", userController_1.deleteUser);
exports.default = router;
