import { Router } from "express";
import {
    getAllReservationsByUserId,
    getReservationById,
    createReservation,
    updateReservation,
    deleteReservation
} from "../controllers/reservationController";

const router = Router();

// router.get("/", getAllReservations); // adimn only
router.get("/", getAllReservationsByUserId);
router.post("/", createReservation);
router.get("/:id", getReservationById);
router.put("/:id", updateReservation);
router.delete("/:id", deleteReservation);

export default router;
