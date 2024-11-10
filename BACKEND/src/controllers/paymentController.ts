import { Payment, User } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import { findUserByClerkId } from "./userController";

export const getAllPaymentsByUserId = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const user: User | null = await findUserByClerkId(req);

        if (!user) {
            res.status(404).json({ message: "User Not Found", success: false });
            return;
        }

        const allPayments: Payment[] = await prisma.payment.findMany({
            where: { user_id: user.id }
        });

        res.status(200).json({
            payments: allPayments,
            message: "Payments Found Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
};

export const getPaymentById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;

        const payment: Payment | null = await prisma.payment.findUnique({
            where: { id }
        });

        if (payment) {
            res.status(200).json({
                payment,
                message: "Payment Found Successfully",
                success: true
            });
        } else {
            res.status(404).json({
                payment,
                message: "Payment Not Found",
                success: false
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
};

export const createPayment = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {
            stripe_id,
            amount,
            currency,
            method,
            status
        }: {
            stripe_id: string;
            amount: number;
            currency: string;
            method: string;
            status?: string;
        } = req.body;

        const user: User | null = await findUserByClerkId(req);

        if (!user) {
            res.status(404).json({ message: "User Not Found", success: false });
            return;
        }

        const newPayment: Payment = await prisma.payment.create({
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
            message: "Payment Created Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
};
export const updatePayment = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;
        const {
            stripe_id,
            amount,
            currency,
            method,
            status
        }: {
            stripe_id?: string;
            amount?: number;
            currency?: string;
            method?: string;
            status?: string;
        } = req.body;

        const payment: Payment | null = await prisma.payment.findUnique({
            where: { id }
        });

        if (!payment) {
            res.status(404).json({
                payment,
                message: "Payment Not Found",
                success: false
            });
            return;
        }

        const updatedPayment: Payment = await prisma.payment.update({
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
            message: "Payment Updated Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
};
export const deletePayment = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;
        const payment: Payment | null = await prisma.payment.findUnique({
            where: { id }
        });

        if (!payment) {
            res.status(404).json({
                payment,
                message: "Payment Not Found",
                success: false
            });
            return;
        }

        const deletedPayment: Payment = await prisma.payment.delete({
            where: { id: payment.id }
        });

        res.status(200).json({
            payment: deletedPayment,
            message: "Payment Deleted Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
};
