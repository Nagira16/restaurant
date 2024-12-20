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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTableAvailability = exports.deleteReservation = exports.updateReservation = exports.createReservation = exports.getReservationById = exports.getAllReservationsByUserId = exports.getAllReservations = void 0;
const prismaClient_1 = require("../prismaClient");
const userController_1 = require("./userController");
const nodemailer_1 = __importDefault(require("nodemailer"));
const getAllReservations = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allReservations = yield prismaClient_1.prisma.reservation.findMany({
            include: {
                user: {
                    select: {
                        name: true
                    }
                },
                table: {
                    select: {
                        number: true
                    }
                }
            }
        });
        res.status(200).json({
            results: allReservations,
            message: "Reservations Found Successfully",
            success: true
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Failed",
            success: false
        });
    }
});
exports.getAllReservations = getAllReservations;
const getAllReservationsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userController_1.findUserByClerkId)(req);
        if (!user) {
            res.status(404).json({
                results: null,
                message: "User Not Found",
                success: false
            });
            return;
        }
        const allReservations = yield prismaClient_1.prisma.reservation.findMany({
            where: { user_id: user.id }
        });
        res.status(200).json({
            results: allReservations,
            message: "Reservations Found Successfully",
            success: true
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Failed",
            success: false
        });
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
                results: reservation,
                message: "Reservation Found Successfully",
                success: true
            });
        }
        else {
            res.status(404).json({
                results: reservation,
                message: "Reservation Not Found",
                success: false
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Failed",
            success: false
        });
    }
});
exports.getReservationById = getReservationById;
const createReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { num_of_people, table_id, location, reservationDateTime } = req.body;
        const user = yield (0, userController_1.findUserByClerkId)(req);
        if (!user) {
            res.status(404).json({
                results: null,
                message: "User Not Found",
                success: false
            });
            return;
        }
        const existingReservation = yield prismaClient_1.prisma.reservation.findFirst({
            where: {
                table_id: table_id,
                reservationDateTime: reservationDateTime
            }
        });
        if (existingReservation) {
            res.status(400).json({
                results: null,
                message: "Table is already reserved for this time.",
                success: false
            });
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
        // await prisma.table.update({
        //     where: {
        //         id: table_id
        //     },
        //     data: {
        //         available: false
        //     }
        // });
        res.status(201).json({
            results: newReservation,
            message: "Reservation Created Successfully",
            success: true
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Failed",
            success: false
        });
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
                results: reservation,
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
        if (updatedReservation.status === "COMPLETED") {
            const user = yield prismaClient_1.prisma.user.findUnique({
                where: { id: updatedReservation.user_id }
            });
            if (user) {
                console.log(process.env.USERPASSWORD);
                if (!process.env.USEREMAIL || !process.env.USERPASSWORD) {
                    res.status(404).json({
                        results: null,
                        message: "Env Not Found",
                        success: false
                    });
                    return;
                }
                const transporter = nodemailer_1.default.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.USEREMAIL,
                        pass: process.env.USERPASSWORD
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });
                const mailOptions = {
                    from: process.env.USEREMAIL,
                    to: user.email,
                    subject: `Your reservaion #${updatedReservation.id} is completed!`,
                    text: `Hello, your reservaion #${updatedReservation.id} is completed!`
                };
                transporter.sendMail(mailOptions);
            }
        }
        if (updatedReservation.status === "COMPLETED") {
            const user = yield prismaClient_1.prisma.user.findUnique({
                where: { id: updatedReservation.user_id }
            });
            if (user) {
                console.log(process.env.USERPASSWORD);
                if (!process.env.USEREMAIL || !process.env.USERPASSWORD) {
                    res.status(404).json({
                        results: null,
                        message: "Env Not Found",
                        success: false
                    });
                    return;
                }
                const transporter = nodemailer_1.default.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.USEREMAIL,
                        pass: process.env.USERPASSWORD
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });
                const mailOptions = {
                    from: process.env.USEREMAIL,
                    to: user.email,
                    subject: `Your reservaion #${updatedReservation.id} is completed!`,
                    text: `Hello, your reservaion #${updatedReservation.id} is completed!`
                };
                transporter.sendMail(mailOptions);
            }
        }
        if (updatedReservation.status === "CONFIRMED") {
            const user = yield prismaClient_1.prisma.user.findUnique({
                where: { id: updatedReservation.user_id }
            });
            if (user) {
                console.log(process.env.USERPASSWORD);
                if (!process.env.USEREMAIL || !process.env.USERPASSWORD) {
                    res.status(404).json({
                        results: null,
                        message: "Env Not Found",
                        success: false
                    });
                    return;
                }
                const transporter = nodemailer_1.default.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.USEREMAIL,
                        pass: process.env.USERPASSWORD
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });
                const mailOptions = {
                    from: process.env.USEREMAIL,
                    to: user.email,
                    subject: `Your reservaion #${updatedReservation.id} is confirmed!`,
                    text: `Hello, your reservaion #${updatedReservation.id} is confirmed!`
                };
                transporter.sendMail(mailOptions);
            }
        }
        if (updatedReservation.status === "CANCELED") {
            const user = yield prismaClient_1.prisma.user.findUnique({
                where: { id: updatedReservation.user_id }
            });
            if (user) {
                console.log(process.env.USERPASSWORD);
                if (!process.env.USEREMAIL || !process.env.USERPASSWORD) {
                    res.status(404).json({
                        results: null,
                        message: "Env Not Found",
                        success: false
                    });
                    return;
                }
                const transporter = nodemailer_1.default.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.USEREMAIL,
                        pass: process.env.USERPASSWORD
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });
                const mailOptions = {
                    from: process.env.USEREMAIL,
                    to: user.email,
                    subject: `Your reservaion #${updatedReservation.id} is canceled!`,
                    text: `Hello, your reservaion #${updatedReservation.id} is canceled!`
                };
                transporter.sendMail(mailOptions);
            }
        }
        res.status(200).json({
            results: updatedReservation,
            message: "Reservation Updated Successfully",
            success: true
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Failed",
            success: false
        });
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
                results: reservation,
                message: "Reservation Not Found",
                success: false
            });
            return;
        }
        const deletedReservation = yield prismaClient_1.prisma.reservation.delete({
            where: { id: reservation.id }
        });
        res.status(200).json({
            results: deletedReservation,
            message: "Reservation Deleted Successfully",
            success: true
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Failed",
            success: false
        });
    }
});
exports.deleteReservation = deleteReservation;
const updateTableAvailability = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentDateTime = new Date();
        const finishedReservations = yield prismaClient_1.prisma.reservation.findMany({
            where: {
                reservationDateTime: {
                    lte: currentDateTime
                },
                table: {
                    available: false
                }
            }
        });
        for (const reservation of finishedReservations) {
            yield prismaClient_1.prisma.table.update({
                where: {
                    id: reservation.table_id
                },
                data: {
                    available: true
                }
            });
        }
    }
    catch (error) {
        console.error("Error updating table availability:", error);
    }
});
exports.updateTableAvailability = updateTableAvailability;
