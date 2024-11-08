import { Role } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../prismaClient";

export const getAllRoles = async (_: Request, res: Response): Promise<void> => {
    try {
        const allRoles: Role[] = await prisma.role.findMany();

        res.status(200).json({
            role: allRoles,
            message: "Roles Found Successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
    }
};

export const getRoleById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;

        const role: Role | null = await prisma.role.findUnique({
            where: { id }
        });

        if (role) {
            res.status(200).json({
                role,
                message: "Role Found Successfully"
            });
        } else {
            res.status(404).json({ role, message: "Role Not Found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
    }
};

export const createRole = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { role_name }: { role_name: string } = req.body;

        const newRole: Role = await prisma.role.create({
            data: {
                role_name
            }
        });

        res.status(201).json({
            Role: newRole,
            message: "Role Created Successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
    }
};
export const updateRole = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;
        const { role_name }: { role_name: string } = req.body;

        const Role: Role | null = await prisma.role.findUnique({
            where: { id }
        });

        if (!Role) {
            res.status(404).json({ Role, message: "Role Not Found" });
            return;
        }

        const updatedRole: Role = await prisma.role.update({
            where: { id },
            data: {
                role_name
            }
        });

        res.status(200).json({
            Role: updatedRole,
            message: "Role Updated Successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
    }
};
export const deleteRole = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;
        const Role: Role | null = await prisma.role.findUnique({
            where: { id }
        });

        if (!Role) {
            res.status(404).json({ Role, message: "Role Not Found" });
            return;
        }

        const deletedRole: Role = await prisma.role.delete({
            where: { id }
        });

        res.status(200).json({
            Role: deletedRole,
            message: "Role Deleted Successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
    }
};
