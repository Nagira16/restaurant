import { Payment, User } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import { findUserByClerkId } from "./userController";
import Stripe from "stripe";

export const getAllPaymentsByUserId = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const user: User | null = await findUserByClerkId(req);

        if (!user) {
            res.status(404).json({
                results: null,
                message: "User Not Found",
                success: false
            });
            return;
        }

        const allPayments: Payment[] = await prisma.payment.findMany({
            where: { user_id: user.id }
        });

        res.status(200).json({
            results: allPayments,
            message: "Payments Found Successfully",
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
                results: payment,
                message: "Payment Found Successfully",
                success: true
            });
        } else {
            res.status(404).json({
                results: payment,
                message: "Payment Not Found",
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

export const createPayment = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {
            total,
            currency,
            method
        }: { total: number; currency: string; method: string } = req.body;

        const user: User | null = await findUserByClerkId(req);

        if (!user) {
            res.status(404).json({
                results: null,
                message: "User Not Found",
                success: false
            });
            return;
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
            apiVersion: "2024-11-20.acacia"
        });

        const amount = Math.round(total * 100);

        const paymentIntent: Stripe.Response<Stripe.PaymentIntent> =
            await stripe.paymentIntents.create({
                amount,
                currency,
                payment_method_types: ["card"],
                metadata: { user_id: user.id }
            });

        const newPayment: Payment = await prisma.payment.create({
            data: {
                user_id: user.id,
                stripe_id: paymentIntent.id,
                amount,
                currency,
                method,
                status: "PENDING"
            }
        });

        res.status(201).json({
            results: newPayment,
            clientSecret: paymentIntent.client_secret,
            message: "Payment Created Successfully",
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

export const updatePayment = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const stripe_id: string = req.params.id;
        const {
            amount,
            currency,
            method,
            status
        }: {
            amount?: number;
            currency?: string;
            method?: string;
            status?: string;
        } = req.body;

        const payment: Payment | null = await prisma.payment.findUnique({
            where: { stripe_id }
        });

        if (!payment) {
            res.status(404).json({
                results: payment,
                message: "Payment Not Found",
                success: false
            });
            return;
        }

        const updatedPayment: Payment = await prisma.payment.update({
            where: { id: payment.id },
            data: {
                stripe_id: payment.stripe_id,
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
    } catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Failed",
            success: false
        });
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
                results: payment,
                message: "Payment Not Found",
                success: false
            });
            return;
        }

        const deletedPayment: Payment = await prisma.payment.delete({
            where: { id: payment.id }
        });

        res.status(200).json({
            results: deletedPayment,
            message: "Payment Deleted Successfully",
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
