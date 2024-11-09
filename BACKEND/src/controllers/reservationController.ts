import { Reservation, User } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import { findUserByClerkId } from "./userController";

export const getAllReservations = async (
    _: Request,
    res: Response
): Promise<void> => {
    try {
        const allReservations: Reservation[] =
            await prisma.reservation.findMany();

        res.status(200).json({
            reservations: allReservations,
            message: "Reservations Found Successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
    }
};

export const getAllReservationsByUserId = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const user: User | null = await findUserByClerkId(req);

        if (!user) {
            res.status(404).json({ message: "User Not Found" });
            return;
        }

        const allReservations: Reservation[] =
            await prisma.reservation.findMany({
                where: { user_id: user.id }
            });

        res.status(200).json({
            reservations: allReservations,
            message: "Reservations Found Successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
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
                reservation,
                message: "Reservation Found Successfully"
            });
        } else {
            res.status(404).json({
                reservation,
                message: "Reservation Not Found"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
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
            res.status(404).json({ message: "User Not Found" });
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

        res.status(201).json({
            reservation: newReservation,
            message: "Reservation Created Successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
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
                reservation,
                message: "Reservation Not Found"
            });
            return;
        }

        const updatedReservation: Reservation = await prisma.reservation.update(
            {
                where: { id },
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
            reservation: updatedReservation,
            message: "Reservation Updated Successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
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
                reservation,
                message: "Reservation Not Found"
            });
            return;
        }

        const deletedReservation: Reservation = await prisma.reservation.delete(
            {
                where: { id }
            }
        );

        res.status(200).json({
            Reservation: deletedReservation,
            message: "Reservation Deleted Successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
    }
};
