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
exports.createOrderDetails = exports.getOrderDetailsById = exports.getAllOrderDetailsByUserId = exports.getAllOrderDetails = void 0;
const prismaClient_1 = require("../prismaClient");
const userController_1 = require("./userController");
const getAllOrderDetails = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allOrder_Details = yield prismaClient_1.prisma.order_Details.findMany();
        res.status(200).json({
            order_Details: allOrder_Details,
            message: "Orders Found Successfully",
            success: true
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
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
        const allOrders = yield prismaClient_1.prisma.order_Details.findMany({
            where: { user_id: user.id }
        });
        res.status(200).json({
            order_Details: allOrders,
            message: "Orders Found Successfully",
            success: true
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
});
exports.getAllOrderDetailsByUserId = getAllOrderDetailsByUserId;
const getOrderDetailsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const order_Details = yield prismaClient_1.prisma.order_Details.findUnique({
            where: { id }
        });
        if (order_Details) {
            res.status(200).json({
                order_Details,
                message: "order_Details Found Successfully",
                success: true
            });
        }
        else {
            res.status(404).json({
                order_Details,
                message: "order_Details Not Found",
                success: false
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
});
exports.getOrderDetailsById = getOrderDetailsById;
const createOrderDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { payment_id, total_price } = req.body;
        const user = yield (0, userController_1.findUserByClerkId)(req);
        if (!user) {
            res.status(404).json({ message: "User Not Found", success: false });
            return;
        }
        const newOrder_Details = yield prismaClient_1.prisma.order_Details.create({
            data: {
                user_id: user.id,
                payment_id,
                total_price
            }
        });
        res.status(201).json({
            order_Details: newOrder_Details,
            message: "Payment Created Successfully",
            success: true
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
});
exports.createOrderDetails = createOrderDetails;
// export const updatePayment = async (
//     req: Request,
//     res: Response
// ): Promise<void> => {
//     try {
//         const id: string = req.params.id;
//         const {
//             payment_id,
//             amount,
//             currency,
//             method,
//             status
//         }: {
//             payment_id?: string;
//             amount?: number;
//             currency?: string;
//             method?: string;
//             status?: string;
//         } = req.body;
//         const payment: Payment | null = await prisma.payment.findUnique({
//             where: { id }
//         });
//         if (!payment) {
//             res.status(404).json({ payment, message: "Payment Not Found" });
//             return;
//         }
//         const updatedPayment: Payment = await prisma.payment.update({
//             where: { id: payment.id },
//             data: {
//                 payment_id: payment_id || payment.payment_id,
//                 amount: amount || payment.amount,
//                 currency: currency || payment.currency,
//                 method: method || payment.method,
//                 status: status || payment.status
//             }
//         });
//         res.status(200).json({
//             payment: updatedPayment,
//             message: "Payment Updated Successfully"
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server Failed" });
//     }
// };
// export const deletePayment = async (
//     req: Request,
//     res: Response
// ): Promise<void> => {
//     try {
//         const id: string = req.params.id;
//         const payment: Payment | null = await prisma.payment.findUnique({
//             where: { id }
//         });
//         if (!payment) {
//             res.status(404).json({ payment, message: "Payment Not Found" });
//             return;
//         }
//         const deletedPayment: Payment = await prisma.payment.delete({
//             where: { id: payment.id }
//         });
//         res.status(200).json({
//             payment: deletedPayment,
//             message: "Payment Deleted Successfully"
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server Failed" });
//     }
// };
