import { NextFunction, Request, Response } from "express";
import { prisma } from "./prismaClient";
import { Role, User } from "@prisma/client";

export const adminMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const clerk_id: string | null = req.auth.userId;
    if (!clerk_id) {
        res.status(401).json({
            results: null,
            message: "Unauthorized",
            success: false
        });
        return;
    }

    const user: User | null = await prisma.user.findUnique({
        where: { clerk_id }
    });

    if (!user) {
        res.status(404).json({
            results: null,
            message: "User Not Found",
            success: false
        });
        return;
    }

    const role: Role | null = await prisma.role.findUnique({
        where: { id: user.role_id }
    });

    if (!role) {
        res.status(404).json({
            results: null,
            message: "Role Not Found",
            success: false
        });
        return;
    }

    if (role.role_name === "Admin") {
        next();
    } else {
        {
            res.status(403).json({
                results: null,
                message: "Forbidden: Admin only",
                success: false
            });
            return;
        }
    }
};
