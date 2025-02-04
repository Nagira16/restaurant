"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderDetailsController_1 = require("../controllers/orderDetailsController");
const router = (0, express_1.Router)();
router.get("/", orderDetailsController_1.getAllOrderDetailsByUserId);
router.post("/", orderDetailsController_1.createOrderDetails);
router.get("/:id", orderDetailsController_1.getOrderDetailsById);
router.put("/:id", orderDetailsController_1.updateOrderDetails);
router.delete("/:id", orderDetailsController_1.deleteOrderDetails);
exports.default = router;
