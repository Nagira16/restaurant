"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const itemOrderDetailsController_1 = require("../controllers/itemOrderDetailsController");
const router = (0, express_1.Router)();
router.get("/", itemOrderDetailsController_1.getAllItemOrderDetailsByOrderId);
router.post("/", itemOrderDetailsController_1.createItemOrderDetails);
router.get("/:id", itemOrderDetailsController_1.getItemOrderDetailsById);
router.put("/:id", itemOrderDetailsController_1.updateItemOrderDetails);
router.delete("/:id", itemOrderDetailsController_1.deleteItemOrderDetails);
exports.default = router;
