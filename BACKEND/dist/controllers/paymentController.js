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
exports.deletePayment = exports.updatePayment = exports.createPayment = exports.getPaymentById = exports.getAllPaymentsByUserId = void 0;
const prismaClient_1 = require("../prismaClient");
const userController_1 = require("./userController");
const stripe_1 = __importDefault(require("stripe"));
const getAllPaymentsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const allPayments = yield prismaClient_1.prisma.payment.findMany({
            where: { user_id: user.id }
        });
        res.status(200).json({
            results: allPayments,
            message: "Payments Found Successfully",
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
exports.getAllPaymentsByUserId = getAllPaymentsByUserId;
const getPaymentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const payment = yield prismaClient_1.prisma.payment.findUnique({
            where: { id }
        });
        if (payment) {
            res.status(200).json({
                results: payment,
                message: "Payment Found Successfully",
                success: true
            });
        }
        else {
            res.status(404).json({
                results: payment,
                message: "Payment Not Found",
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
exports.getPaymentById = getPaymentById;
const createPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { total, currency, method } = req.body;
        const user = yield (0, userController_1.findUserByClerkId)(req);
        if (!user) {
            res.status(404).json({
                results: null,
                message: "User Not Found",
                success: false
            });
            return;
        }
        console.log("ajfihhsdjfhjhjhhhjh", process.env.STRIPE_SECRET_KEY);
        const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
            apiVersion: "2024-11-20.acacia"
        });
        const amount = Math.round(total * 100);
        const paymentIntent = yield stripe.paymentIntents.create({
            amount,
            currency,
            metadata: { user_id: user.id }
        });
        // const newPayment: Payment = await prisma.payment.create({
        //     data: {
        //         user_id: user.id,
        //         stripe_id: paymentIntent.id,
        //         amount,
        //         currency,
        //         method,
        //         status: "PENDING"
        //     }
        // });
        res.status(201).json({
            results: [],
            clientSecret: paymentIntent.client_secret,
            message: "Payment Created Successfully",
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
exports.createPayment = createPayment;
const updatePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { stripe_id, amount, currency, method, status } = req.body;
        const payment = yield prismaClient_1.prisma.payment.findUnique({
            where: { id }
        });
        if (!payment) {
            res.status(404).json({
                results: payment,
                message: "Payment Not Found",
                success: false
            });
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
            results: updatedPayment,
            message: "Payment Updated Successfully",
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
exports.updatePayment = updatePayment;
const deletePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const payment = yield prismaClient_1.prisma.payment.findUnique({
            where: { id }
        });
        if (!payment) {
            res.status(404).json({
                results: payment,
                message: "Payment Not Found",
                success: false
            });
            return;
        }
        const deletedPayment = yield prismaClient_1.prisma.payment.delete({
            where: { id: payment.id }
        });
        res.status(200).json({
            results: deletedPayment,
            message: "Payment Deleted Successfully",
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
exports.deletePayment = deletePayment;
