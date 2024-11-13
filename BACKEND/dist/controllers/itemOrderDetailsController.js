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
exports.deleteItemOrderDetails = exports.updateItemOrderDetails = exports.createItemOrderDetails = exports.getItemOrderDetailsById = exports.getAllItemOrderDetailsByOrderId = exports.getAllItemOrderDetails = void 0;
const prismaClient_1 = require("../prismaClient");
const userController_1 = require("./userController");
const getAllItemOrderDetails = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allItemOrderDetails = yield prismaClient_1.prisma.item_Order_Details.findMany();
        res.status(200).json({
            results: allItemOrderDetails,
            message: "Item Order Details Found Successfully",
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
exports.getAllItemOrderDetails = getAllItemOrderDetails;
const getAllItemOrderDetailsByOrderId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order_details_id = req.body.orderDetailsId;
        const allItemOrderDetails = yield prismaClient_1.prisma.item_Order_Details.findMany({
            where: { order_details_id }
        });
        res.status(200).json({
            results: allItemOrderDetails,
            message: "Item Order Details Found Successfully",
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
exports.getAllItemOrderDetailsByOrderId = getAllItemOrderDetailsByOrderId;
const getItemOrderDetailsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const itemOrderDetails = yield prismaClient_1.prisma.item_Order_Details.findUnique({
            where: { id }
        });
        if (itemOrderDetails) {
            res.status(200).json({
                results: itemOrderDetails,
                message: "Item Order Details Found Successfully",
                success: true
            });
        }
        else {
            res.status(404).json({
                results: itemOrderDetails,
                message: "Item Order Details Not Found",
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
exports.getItemOrderDetailsById = getItemOrderDetailsById;
const createItemOrderDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_details_id, menu_id, quantity } = req.body;
        const user = yield (0, userController_1.findUserByClerkId)(req);
        if (!user) {
            res.status(404).json({
                results: null,
                message: "User Not Found",
                success: false
            });
            return;
        }
        const menu = yield prismaClient_1.prisma.menu.findUnique({
            where: { id: menu_id }
        });
        const orderDetails = yield prismaClient_1.prisma.order_Details.findUnique({
            where: { id: order_details_id }
        });
        if (!menu || !orderDetails)
            throw new Error();
        const newItemOrderDetails = yield prismaClient_1.prisma.item_Order_Details.create({
            data: {
                order_details_id: orderDetails.id,
                menu_id: menu.id,
                quantity
            }
        });
        res.status(201).json({
            results: newItemOrderDetails,
            message: "Item Order Details Created Successfully",
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
exports.createItemOrderDetails = createItemOrderDetails;
const updateItemOrderDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { order_details_id, menu_id, quantity } = req.body;
        const itemOrderDetails = yield prismaClient_1.prisma.item_Order_Details.findUnique({
            where: { id }
        });
        if (!itemOrderDetails) {
            res.status(404).json({
                results: itemOrderDetails,
                message: "Item Order Details Not Found",
                success: false
            });
            return;
        }
        const updatedItemOrderDetails = yield prismaClient_1.prisma.item_Order_Details.update({
            where: { id: itemOrderDetails.id },
            data: {
                order_details_id: order_details_id || itemOrderDetails.order_details_id,
                menu_id: menu_id || itemOrderDetails.menu_id,
                quantity: quantity || itemOrderDetails.quantity
            }
        });
        res.status(200).json({
            results: updatedItemOrderDetails,
            message: "Item Order Details Updated Successfully",
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
exports.updateItemOrderDetails = updateItemOrderDetails;
const deleteItemOrderDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const itemOrderDetails = yield prismaClient_1.prisma.item_Order_Details.findUnique({
            where: { id }
        });
        if (!itemOrderDetails) {
            res.status(404).json({
                results: itemOrderDetails,
                message: "Item Order Details Not Found",
                success: false
            });
            return;
        }
        const deletedItemOrderDetails = yield prismaClient_1.prisma.item_Order_Details.delete({
            where: { id: itemOrderDetails.id }
        });
        res.status(200).json({
            results: deletedItemOrderDetails,
            message: "Item Order Details Deleted Successfully",
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
exports.deleteItemOrderDetails = deleteItemOrderDetails;
