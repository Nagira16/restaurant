"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const nutrientsController_1 = require("../controllers/nutrientsController");
const router = (0, express_1.Router)();
// router.get("/", getAllNutrients); // admin only
// router.post("/", createNutrient); // admin only
router.get("/:id", nutrientsController_1.getNutrientByMenuId);
// router.put("/:id", updateNutrient); // admin only
// router.delete("/:id", deleteNutrient); // admin only
exports.default = router;
