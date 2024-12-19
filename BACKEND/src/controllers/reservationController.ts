import { Reservation, User } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import { findUserByClerkId } from "./userController";
import { ReservationWithUserNameTableNumber } from "../types";

export const getAllReservations = async (
    _: Request,
    res: Response
): Promise<void> => {
    try {
        const allReservations: ReservationWithUserNameTableNumber[] =
            await prisma.reservation.findMany({
                include: {
                    user: {
                        select: {
                            name: true
                        }
                    },
                    table: {
                        select: {
                            number: true
                        }
                    }
                }
            });

        res.status(200).json({
            results: allReservations,
            message: "Reservations Found Successfully",
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

export const getAllReservationsByUserId = async (
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

        const allReservations: Reservation[] =
            await prisma.reservation.findMany({
                where: { user_id: user.id }
            });

        res.status(200).json({
            results: allReservations,
            message: "Reservations Found Successfully",
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

export const getReservationById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;

        const reservation: Reservation | null =
            await prisma.reservation.findUnique({
                where: { id }
            });

        if (reservation) {
            res.status(200).json({
                results: reservation,
                message: "Reservation Found Successfully",
                success: true
            });
        } else {
            res.status(404).json({
                results: reservation,
                message: "Reservation Not Found",
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

export const createReservation = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {
            num_of_people,
            table_id,
            location,
            reservationDateTime
        }: {
            num_of_people: number;
            table_id: string;
            location: string;
            reservationDateTime: Date;
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

        const existingReservation = await prisma.reservation.findFirst({
            where: {
                table_id: table_id,
                reservationDateTime: reservationDateTime
            }
        });

        if (existingReservation) {
            res.status(400).json({
                results: null,
                message: "Table is already reserved for this time.",
                success: false
            });
            return;
        }

        const newReservation: Reservation = await prisma.reservation.create({
            data: {
                user_id: user.id,
                num_of_people,
                table_id,
                location,
                reservationDateTime
            }
        });

        // await prisma.table.update({
        //     where: {
        //         id: table_id
        //     },
        //     data: {
        //         available: false
        //     }
        // });

        res.status(201).json({
            results: newReservation,
            message: "Reservation Created Successfully",
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

export const updateReservation = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;
        const {
            num_of_people,
            table_id,
            location,
            reservationDateTime,
            status
        }: {
            num_of_people?: number;
            table_id?: string;
            location?: string;
            reservationDateTime?: Date;
            status?: string;
        } = req.body;

        const reservation: Reservation | null =
            await prisma.reservation.findUnique({
                where: { id }
            });

        if (!reservation) {
            res.status(404).json({
                results: reservation,
                message: "Reservation Not Found",
                success: false
            });
            return;
        }

        const updatedReservation: Reservation = await prisma.reservation.update(
            {
                where: { id: reservation.id },
                data: {
                    num_of_people: num_of_people || reservation.num_of_people,
                    table_id: table_id || reservation.table_id,
                    location: location || reservation.location,
                    reservationDateTime:
                        reservationDateTime || reservation.reservationDateTime,
                    status: status || reservation.status
                }
            }
        );

        res.status(200).json({
            results: updatedReservation,
            message: "Reservation Updated Successfully",
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

export const deleteReservation = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;

        const reservation: Reservation | null =
            await prisma.reservation.findUnique({
                where: { id }
            });

        if (!reservation) {
            res.status(404).json({
                results: reservation,
                message: "Reservation Not Found",
                success: false
            });
            return;
        }

        const deletedReservation: Reservation = await prisma.reservation.delete(
            {
                where: { id: reservation.id }
            }
        );

        res.status(200).json({
            results: deletedReservation,
            message: "Reservation Deleted Successfully",
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

export const updateTableAvailability = async (): Promise<void> => {
    try {
        const currentDateTime = new Date();

        const finishedReservations: Reservation[] =
            await prisma.reservation.findMany({
                where: {
                    reservationDateTime: {
                        lte: currentDateTime
                    },
                    table: {
                        available: false
                    }
                }
            });

        for (const reservation of finishedReservations) {
            await prisma.table.update({
                where: {
                    id: reservation.table_id!
                },
                data: {
                    available: true
                }
            });
        }
    } catch (error) {
        console.error("Error updating table availability:", error);
    }
};
