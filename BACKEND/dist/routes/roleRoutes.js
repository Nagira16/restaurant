"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roleController_1 = require("../controllers/roleController");
const router = (0, express_1.Router)();
router.get("/", roleController_1.getAllRoles);
// router.post("/", createRole); // admin only
router.get("/:id", roleController_1.getRoleById);
// router.put("/:id", updateRole); // admin only
// router.delete("/:id", deleteRole); // admin only
exports.default = router;
