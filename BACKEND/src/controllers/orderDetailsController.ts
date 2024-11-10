import { Order_Details, User } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import { findUserByClerkId } from "./userController";

export const getAllOrderDetails = async (
    _: Request,
    res: Response
): Promise<void> => {
    try {
        const allOrder_Details: Order_Details[] =
            await prisma.order_Details.findMany();

        res.status(200).json({
            order_Details: allOrder_Details,
            message: "order_Details Found Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
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

        const allOrders: Order_Details[] = await prisma.order_Details.findMany({
            where: { user_id: user.id }
        });

        res.status(200).json({
            order_Details: allOrders,
            message: "order_Details Found Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
};

export const getOrderDetailsById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;

        const order_Details: Order_Details | null =
            await prisma.order_Details.findUnique({
                where: { id }
            });

        if (order_Details) {
            res.status(200).json({
                order_Details,
                message: "order_Details Found Successfully",
                success: true
            });
        } else {
            res.status(404).json({
                order_Details,
                message: "order_Details Not Found",
                success: false
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
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
            res.status(404).json({ message: "User Not Found", success: false });
            return;
        }

        const newOrder_Details: Order_Details =
            await prisma.order_Details.create({
                data: {
                    user_id: user.id,
                    payment_id,
                    total_price
                }
            });

        res.status(201).json({
            order_Details: newOrder_Details,
            message: "order_Details Created Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
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

        const order_Details: Order_Details | null =
            await prisma.order_Details.findUnique({
                where: { id }
            });

        if (!order_Details) {
            res.status(404).json({
                order_Details,
                message: "Order_Details Not Found",
                success: false
            });
            return;
        }

        const updatedOrder_Details: Order_Details =
            await prisma.order_Details.update({
                where: { id: order_Details.id },
                data: {
                    payment_id: payment_id || order_Details.payment_id,
                    total_price: total_price || order_Details.total_price,
                    status: status || order_Details.status
                }
            });

        res.status(200).json({
            order_Details: updatedOrder_Details,
            message: "Order_Details Updated Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
};

export const deleteOrderDetails = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;
        const order_Details: Order_Details | null =
            await prisma.order_Details.findUnique({
                where: { id }
            });

        if (!order_Details) {
            res.status(404).json({
                order_Details,
                message: "Order_Details Not Found",
                success: false
            });
            return;
        }

        const deletedOrder_Details: Order_Details =
            await prisma.order_Details.delete({
                where: { id: order_Details.id }
            });

        res.status(200).json({
            order_Details: deletedOrder_Details,
            message: "Order_Details Deleted Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
};
