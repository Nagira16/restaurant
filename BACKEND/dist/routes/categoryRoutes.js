"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = require("../controllers/categoryController");
const router = (0, express_1.Router)();
router.get("/", categoryController_1.getAllCategories);
// router.post("/", createCategory); // admin only
router.get("/:name", categoryController_1.getAllMenusByCategoryName);
// router.put("/:id", updateCategory); // admin only
// router.delete("/:id", deleteCategory); // admin only
exports.default = router;
