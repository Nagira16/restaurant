import { Item_Order_Details, Menu, Order_Details, User } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import { findUserByClerkId } from "./userController";
import { ItemOrderDetailsWithMenuInfo } from "../types";

export const getAllItemOrderDetails = async (
    _: Request,
    res: Response
): Promise<void> => {
    try {
        const allItemOrderDetails: Item_Order_Details[] =
            await prisma.item_Order_Details.findMany();

        res.status(200).json({
            results: allItemOrderDetails,
            message: "Item Order Details Found Successfully",
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

export const getAllItemOrderDetailsByOrderId = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const order_details_id: string = req.params.id;

        const allItemOrderDetails: ItemOrderDetailsWithMenuInfo[] =
            await prisma.item_Order_Details.findMany({
                where: { order_details_id },
                include: {
                    menu: {
                        select: {
                            name: true,
                            image: true
                        }
                    }
                }
            });

        res.status(200).json({
            results: allItemOrderDetails,
            message: "Item Order Details Found Successfully",
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

export const getItemOrderDetailsById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;

        const itemOrderDetails: Item_Order_Details | null =
            await prisma.item_Order_Details.findUnique({
                where: { id }
            });

        if (itemOrderDetails) {
            res.status(200).json({
                results: itemOrderDetails,
                message: "Item Order Details Found Successfully",
                success: true
            });
        } else {
            res.status(404).json({
                results: itemOrderDetails,
                message: "Item Order Details Not Found",
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

export const createItemOrderDetails = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {
            order_details_id,
            menu_id,
            quantity
        }: {
            order_details_id: string;
            menu_id: string;
            quantity: number;
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

        const menu: Menu | null = await prisma.menu.findUnique({
            where: { id: menu_id }
        });
        const orderDetails: Order_Details | null =
            await prisma.order_Details.findUnique({
                where: { id: order_details_id }
            });

        if (!menu || !orderDetails) throw new Error();

        const newItemOrderDetails: Item_Order_Details =
            await prisma.item_Order_Details.create({
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
    } catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Failed",
            success: false
        });
    }
};

export const updateItemOrderDetails = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;
        const {
            order_details_id,
            menu_id,
            quantity
        }: {
            order_details_id?: string;
            menu_id?: string;
            quantity?: number;
        } = req.body;

        const itemOrderDetails: Item_Order_Details | null =
            await prisma.item_Order_Details.findUnique({
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

        const updatedItemOrderDetails: Item_Order_Details =
            await prisma.item_Order_Details.update({
                where: { id: itemOrderDetails.id },
                data: {
                    order_details_id:
                        order_details_id || itemOrderDetails.order_details_id,
                    menu_id: menu_id || itemOrderDetails.menu_id,
                    quantity: quantity || itemOrderDetails.quantity
                }
            });

        res.status(200).json({
            results: updatedItemOrderDetails,
            message: "Item Order Details Updated Successfully",
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

export const deleteItemOrderDetails = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;
        const itemOrderDetails: Item_Order_Details | null =
            await prisma.item_Order_Details.findUnique({
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

        const deletedItemOrderDetails: Item_Order_Details =
            await prisma.item_Order_Details.delete({
                where: { id: itemOrderDetails.id }
            });

        res.status(200).json({
            results: deletedItemOrderDetails,
            message: "Item Order Details Deleted Successfully",
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
