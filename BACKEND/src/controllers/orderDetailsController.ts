import { Order_Details, User } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import { findUserByClerkId } from "./userController";
import { Order_DetailsWithUserName } from "../types";

export const getAllOrderDetails = async (
    _: Request,
    res: Response
): Promise<void> => {
    try {
        const allOrderDetails: Order_DetailsWithUserName[] =
            await prisma.order_Details.findMany({
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
    } catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Failed",
            success: false
        });
    }
};

export const getAllOrderDetailsByUserId = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const user: User | null = await findUserByClerkId(req);

        if (!user) {
            res.status(404).json({ message: "User Not Found", success: false });
            return;
        }

        const allOrderDetails: Order_Details[] =
            await prisma.order_Details.findMany({
                where: { user_id: user.id }
            });

        res.status(200).json({
            results: allOrderDetails,
            message: "Order Details Found Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Failed",
            success: false
        });
    }
};

export const getOrderDetailsById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;

        const orderDetails: Order_Details | null =
            await prisma.order_Details.findUnique({
                where: { id }
            });

        if (orderDetails) {
            res.status(200).json({
                results: orderDetails,
                message: "Order Details Found Successfully",
                success: true
            });
        } else {
            res.status(404).json({
                results: orderDetails,
                message: "Order Details Not Found",
                success: false
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Failed",
            success: false
        });
    }
};

export const createOrderDetails = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {
            payment_id,
            total_price
        }: {
            payment_id: string;
            total_price: number;
        } = req.body;

        const user: User | null = await findUserByClerkId(req);

        if (!user) {
            res.status(404).json({
                results: null,
                message: "User Not Found",
                success: false
            });
            return;
        }

        const newOrderDetails: Order_Details =
            await prisma.order_Details.create({
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
    } catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Failed",
            success: false
        });
    }
};

export const updateOrderDetails = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;
        const {
            payment_id,
            total_price,
            status
        }: {
            payment_id?: string;
            total_price?: number;
            status?: string;
        } = req.body;

        const orderDetails: Order_Details | null =
            await prisma.order_Details.findUnique({
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

        const updatedOrderDetails: Order_Details =
            await prisma.order_Details.update({
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
    } catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Failed",
            success: false
        });
    }
};

export const deleteOrderDetails = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;
        const orderDetails: Order_Details | null =
            await prisma.order_Details.findUnique({
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

        const deletedOrder_Details: Order_Details =
            await prisma.order_Details.delete({
                where: { id: orderDetails.id }
            });

        res.status(200).json({
            results: deletedOrder_Details,
            message: "Order Details Deleted Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Failed",
            success: false
        });
    }
};
