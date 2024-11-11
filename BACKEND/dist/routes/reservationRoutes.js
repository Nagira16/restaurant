"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reservationController_1 = require("../controllers/reservationController");
const router = (0, express_1.Router)();
// router.get("/", getAllReservations); // adimn only
router.get("/", reservationController_1.getAllReservationsByUserId);
router.post("/", reservationController_1.createReservation);
router.get("/:id", reservationController_1.getReservationById);
router.put("/:id", reservationController_1.updateReservation);
router.delete("/:id", reservationController_1.deleteReservation);
exports.default = router;
