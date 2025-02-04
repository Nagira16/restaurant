import { Role } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import { RoleWithUserName } from "../types";

export const getAllRolesWithUsers = async (
    _: Request,
    res: Response
): Promise<void> => {
    try {
        const allRoles: RoleWithUserName[] = await prisma.role.findMany({
            include: {
                users: {
                    select: {
                        name: true
                    }
                }
            }
        });

        res.status(200).json({
            results: allRoles,
            message: "Roles Found Successfully",
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

export const getAllRoles = async (_: Request, res: Response): Promise<void> => {
    try {
        const allRoles: Role[] = await prisma.role.findMany();

        res.status(200).json({
            results: allRoles,
            message: "Roles Found Successfully",
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
                results: role,
                message: "Role Found Successfully",
                success: true
            });
        } else {
            res.status(404).json({
                results: role,
                message: "Role Not Found",
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
            results: newRole,
            message: "Role Created Successfully",
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

export const updateRole = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;
        const { role_name }: { role_name: string } = req.body;

        const role: Role | null = await prisma.role.findUnique({
            where: { id }
        });

        if (!role) {
            res.status(404).json({
                results: role,
                message: "Role Not Found",
                success: false
            });
            return;
        }

        const updatedRole: Role = await prisma.role.update({
            where: { id: role.id },
            data: {
                role_name
            }
        });

        res.status(200).json({
            results: updatedRole,
            message: "Role Updated Successfully",
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

export const deleteRole = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;
        const role: Role | null = await prisma.role.findUnique({
            where: { id }
        });

        if (!role) {
            res.status(404).json({
                results: role,
                message: "Role Not Found",
                success: false
            });
            return;
        }

        const deletedRole: Role = await prisma.role.delete({
            where: { id: role.id }
        });

        res.status(200).json({
            results: deletedRole,
            message: "Role Deleted Successfully",
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
