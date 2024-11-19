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
exports.deleteOrderDetails = exports.updateOrderDetails = exports.createOrderDetails = exports.getOrderDetailsById = exports.getAllOrderDetailsByUserId = exports.getAllOrderDetails = void 0;
const prismaClient_1 = require("../prismaClient");
const userController_1 = require("./userController");
const getAllOrderDetails = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allOrderDetails = yield prismaClient_1.prisma.order_Details.findMany();
        res.status(200).json({
            results: allOrderDetails,
            message: "Order Details Found Successfully",
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
exports.getAllOrderDetails = getAllOrderDetails;
const getAllOrderDetailsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userController_1.findUserByClerkId)(req);
        if (!user) {
            res.status(404).json({ message: "User Not Found", success: false });
            return;
        }
        const allOrderDetails = yield prismaClient_1.prisma.order_Details.findMany({
            where: { user_id: user.id }
        });
        res.status(200).json({
            results: allOrderDetails,
            message: "Order Details Found Successfully",
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
exports.getAllOrderDetailsByUserId = getAllOrderDetailsByUserId;
const getOrderDetailsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const orderDetails = yield prismaClient_1.prisma.order_Details.findUnique({
            where: { id }
        });
        if (orderDetails) {
            res.status(200).json({
                results: orderDetails,
                message: "Order Details Found Successfully",
                success: true
            });
        }
        else {
            res.status(404).json({
                results: orderDetails,
                message: "Order Details Not Found",
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
exports.getOrderDetailsById = getOrderDetailsById;
const createOrderDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { payment_id, total_price } = req.body;
        const user = yield (0, userController_1.findUserByClerkId)(req);
        if (!user) {
            res.status(404).json({
                results: null,
                message: "User Not Found",
                success: false
            });
            return;
        }
        const newOrderDetails = yield prismaClient_1.prisma.order_Details.create({
            data: {
                user_id: user.id,
                payment_id,
                total_price
            }
        });
        res.status(201).json({
            results: newOrderDetails,
            message: "Order Details Created Successfully",
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
exports.createOrderDetails = createOrderDetails;
const updateOrderDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { payment_id, total_price, status } = req.body;
        const orderDetails = yield prismaClient_1.prisma.order_Details.findUnique({
            where: { id }
        });
        if (!orderDetails) {
            res.status(404).json({
                results: orderDetails,
                message: "Order Details Not Found",
                success: false
            });
            return;
        }
        const updatedOrderDetails = yield prismaClient_1.prisma.order_Details.update({
            where: { id: orderDetails.id },
            data: {
                payment_id: payment_id || orderDetails.payment_id,
                total_price: total_price || orderDetails.total_price,
                status: status || orderDetails.status
            }
        });
        res.status(200).json({
            results: updatedOrderDetails,
            message: "Order Details Updated Successfully",
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
exports.updateOrderDetails = updateOrderDetails;
const deleteOrderDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const orderDetails = yield prismaClient_1.prisma.order_Details.findUnique({
            where: { id }
        });
        if (!orderDetails) {
            res.status(404).json({
                results: orderDetails,
                message: "Order Details Not Found",
                success: false
            });
            return;
        }
        const deletedOrder_Details = yield prismaClient_1.prisma.order_Details.delete({
            where: { id: orderDetails.id }
        });
        res.status(200).json({
            results: deletedOrder_Details,
            message: "Order Details Deleted Successfully",
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
exports.deleteOrderDetails = deleteOrderDetails;
