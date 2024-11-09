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
exports.deletePayment = exports.updatePayment = exports.createPayment = exports.getPaymentById = exports.getAllPaymentsByUserId = void 0;
const prismaClient_1 = require("../prismaClient");
const userController_1 = require("./userController");
const getAllPaymentsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userController_1.findUserByClerkId)(req);
        if (!user) {
            res.status(404).json({ message: "User Not Found" });
            return;
        }
        const allPayments = yield prismaClient_1.prisma.payment.findMany({
            where: { user_id: user.id }
        });
        res.status(200).json({
            payments: allPayments,
            message: "Payments Found Successfully"
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
    }
});
exports.getAllPaymentsByUserId = getAllPaymentsByUserId;
const getPaymentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const payment = yield prismaClient_1.prisma.payment.findUnique({
            where: { id }
        });
        if (payment) {
            res.status(200).json({
                payment,
                message: "Payment Found Successfully"
            });
        }
        else {
            res.status(404).json({ payment, message: "Payment Not Found" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
    }
});
exports.getPaymentById = getPaymentById;
const createPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { stripe_id, amount, currency, method, status } = req.body;
        const user = yield (0, userController_1.findUserByClerkId)(req);
        if (!user) {
            res.status(404).json({ message: "User Not Found" });
            return;
        }
        const newPayment = yield prismaClient_1.prisma.payment.create({
            data: {
                user_id: user.id,
                stripe_id,
                amount,
                currency,
                method,
                status
            }
        });
        res.status(201).json({
            payment: newPayment,
            message: "Payment Created Successfully"
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
    }
});
exports.createPayment = createPayment;
const updatePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { stripe_id, amount, currency, method, status } = req.body;
        const payment = yield prismaClient_1.prisma.payment.findUnique({
            where: { id }
        });
        if (!payment) {
            res.status(404).json({ payment, message: "Payment Not Found" });
            return;
        }
        const updatedPayment = yield prismaClient_1.prisma.payment.update({
            where: { id: payment.id },
            data: {
                stripe_id: stripe_id || payment.stripe_id,
                amount: amount || payment.amount,
                currency: currency || payment.currency,
                method: method || payment.method,
                status: status || payment.status
            }
        });
        res.status(200).json({
            payment: updatedPayment,
            message: "Payment Updated Successfully"
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
    }
});
exports.updatePayment = updatePayment;
const deletePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const payment = yield prismaClient_1.prisma.payment.findUnique({
            where: { id }
        });
        if (!payment) {
            res.status(404).json({ payment, message: "Payment Not Found" });
            return;
        }
        const deletedPayment = yield prismaClient_1.prisma.payment.delete({
            where: { id: payment.id }
        });
        res.status(200).json({
            payment: deletedPayment,
            message: "Payment Deleted Successfully"
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
    }
});
exports.deletePayment = deletePayment;
