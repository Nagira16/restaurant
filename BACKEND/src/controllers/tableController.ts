import { Table } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../prismaClient";

export const getAllTables = async (
    _: Request,
    res: Response
): Promise<void> => {
    try {
        const allTable: Table[] = await prisma.table.findMany();

        res.status(200).json({
            tables: allTable,
            message: "Tables Found Successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
    }
};

export const getTableById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;

        const table: Table | null = await prisma.table.findUnique({
            where: { id }
        });

        if (table) {
            res.status(200).json({
                table,
                message: "Table Found Successfully"
            });
        } else {
            res.status(404).json({ table, message: "Table Not Found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
    }
};

export const createTable = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {
            number,
            capacity,
            available
        }: { number: number; capacity: number; available: boolean } = req.body;

        const newTable: Table = await prisma.table.create({
            data: {
                number,
                capacity,
                available
            }
        });

        res.status(201).json({
            table: newTable,
            message: "Table Created Successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
    }
};
export const updateTable = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;
        const {
            number,
            capacity,
            available
        }: { number?: number; capacity?: number; available?: boolean } =
            req.body;

        const table: Table | null = await prisma.table.findUnique({
            where: { id }
        });

        if (!table) {
            res.status(404).json({ table, message: "Table Not Found" });
            return;
        }

        const updatedTable: Table = await prisma.table.update({
            where: { id },
            data: {
                number: number || table.number,
                capacity: capacity || table.capacity,
                available: available || table.available
            }
        });

        res.status(200).json({
            table: updatedTable,
            message: "Table Updated Successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
    }
};
export const deleteTable = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;
        const table: Table | null = await prisma.table.findUnique({
            where: { id }
        });

        if (!table) {
            res.status(404).json({ table, message: "Table Not Found" });
            return;
        }

        const deletedTable: Table = await prisma.table.delete({
            where: { id }
        });

        res.status(200).json({
            table: deletedTable,
            message: "Table Deleted Successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
    }
};
