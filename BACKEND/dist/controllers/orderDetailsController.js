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
exports.deleteOrderDetails = exports.updateOrderDetails = exports.createOrderDetails = exports.getOrderDetailsById = exports.getAllOrderDetailsByUserId = exports.getAllOrderDetails = void 0;
const prismaClient_1 = require("../prismaClient");
const nodemailer_1 = __importDefault(require("nodemailer"));
const userController_1 = require("./userController");
const getAllOrderDetails = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allOrderDetails = yield prismaClient_1.prisma.order_Details.findMany({
            include: {
                user: {
                    select: {
                        name: true
                    }
                }
            }
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
        res.setHeader("Cache-Control", "no-store");
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
        if (updatedOrderDetails.status === "PREPARING") {
            const user = yield prismaClient_1.prisma.user.findUnique({
                where: { id: orderDetails.user_id }
            });
            if (user) {
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
                    subject: `Your order #${orderDetails.id} is preparing!`,
                    text: `Hello, your order #${orderDetails.id} is now preparing. We'll send email when your order is ready for pickup!`
                };
                transporter.sendMail(mailOptions);
            }
        }
        if (updatedOrderDetails.status === "PICKUP") {
            const user = yield prismaClient_1.prisma.user.findUnique({
                where: { id: orderDetails.user_id }
            });
            if (user) {
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
                    subject: `Your order #${orderDetails.id} is ready for pickup!`,
                    text: `Hello, your order #${orderDetails.id} is now ready for pickup. Please visit us to collect it!`
                };
                transporter.sendMail(mailOptions);
            }
        }
        if (updatedOrderDetails.status === "CANCELED") {
            const user = yield prismaClient_1.prisma.user.findUnique({
                where: { id: orderDetails.user_id }
            });
            if (user) {
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
                    subject: `Your order #${orderDetails.id} is canceled!`,
                    text: `Hello, your order #${orderDetails.id} is canceled!`
                };
                transporter.sendMail(mailOptions);
            }
        }
        if (updatedOrderDetails.status === "COMPLETED") {
            const user = yield prismaClient_1.prisma.user.findUnique({
                where: { id: orderDetails.user_id }
            });
            if (user) {
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
                    subject: `Your order #${orderDetails.id} is completed!`,
                    text: `Hello, your order #${orderDetails.id} is completed!`
                };
                transporter.sendMail(mailOptions);
            }
        }
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
