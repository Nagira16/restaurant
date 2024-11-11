"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tableController_1 = require("../controllers/tableController");
const router = (0, express_1.Router)();
router.get("/", tableController_1.getAllTables);
// router.post("/", createTable); // admin only
router.get("/:id", tableController_1.getTableById);
// router.put("/:id", updateTable); // admin only
// router.delete("/:id", deleteTable); // admin only
exports.default = router;
