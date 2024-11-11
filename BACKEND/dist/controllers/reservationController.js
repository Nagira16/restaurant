"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReservation = exports.updateReservation = exports.createReservation = exports.getReservationById = exports.getAllReservationsByUserId = exports.getAllReservations = void 0;
const prismaClient_1 = require("../prismaClient");
const userController_1 = require("./userController");
const getAllReservations = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allReservations = yield prismaClient_1.prisma.reservation.findMany();
        res.status(200).json({
            reservations: allReservations,
            message: "Reservations Found Successfully",
            success: true
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
});
exports.getAllReservations = getAllReservations;
const getAllReservationsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userController_1.findUserByClerkId)(req);
        if (!user) {
            res.status(404).json({ message: "User Not Found", success: false });
            return;
        }
        const allReservations = yield prismaClient_1.prisma.reservation.findMany({
            where: { user_id: user.id }
        });
        res.status(200).json({
            reservations: allReservations,
            message: "Reservations Found Successfully",
            success: true
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
});
exports.getAllReservationsByUserId = getAllReservationsByUserId;
const getReservationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const reservation = yield prismaClient_1.prisma.reservation.findUnique({
            where: { id }
        });
        if (reservation) {
            res.status(200).json({
                reservation,
                message: "Reservation Found Successfully",
                success: true
            });
        }
        else {
            res.status(404).json({
                reservation,
                message: "Reservation Not Found",
                success: false
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
});
exports.getReservationById = getReservationById;
const createReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { num_of_people, table_id, location, reservationDateTime } = req.body;
        const user = yield (0, userController_1.findUserByClerkId)(req);
        if (!user) {
            res.status(404).json({ message: "User Not Found", success: false });
            return;
        }
        const newReservation = yield prismaClient_1.prisma.reservation.create({
            data: {
                user_id: user.id,
                num_of_people,
                table_id,
                location,
                reservationDateTime
            }
        });
        res.status(201).json({
            reservation: newReservation,
            message: "Reservation Created Successfully",
            success: true
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
});
exports.createReservation = createReservation;
const updateReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { num_of_people, table_id, location, reservationDateTime, status } = req.body;
        const reservation = yield prismaClient_1.prisma.reservation.findUnique({
            where: { id }
        });
        if (!reservation) {
            res.status(404).json({
                reservation,
                message: "Reservation Not Found",
                success: false
            });
            return;
        }
        const updatedReservation = yield prismaClient_1.prisma.reservation.update({
            where: { id: reservation.id },
            data: {
                num_of_people: num_of_people || reservation.num_of_people,
                table_id: table_id || reservation.table_id,
                location: location || reservation.location,
                reservationDateTime: reservationDateTime || reservation.reservationDateTime,
                status: status || reservation.status
            }
        });
        res.status(200).json({
            reservation: updatedReservation,
            message: "Reservation Updated Successfully",
            success: true
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
});
exports.updateReservation = updateReservation;
const deleteReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const reservation = yield prismaClient_1.prisma.reservation.findUnique({
            where: { id }
        });
        if (!reservation) {
            res.status(404).json({
                reservation,
                message: "Reservation Not Found",
                success: false
            });
            return;
        }
        const deletedReservation = yield prismaClient_1.prisma.reservation.delete({
            where: { id: reservation.id }
        });
        res.status(200).json({
            Reservation: deletedReservation,
            message: "Reservation Deleted Successfully",
            success: true
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
});
exports.deleteReservation = deleteReservation;
