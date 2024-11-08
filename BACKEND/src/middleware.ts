import { NextFunction, Request, Response } from "express";
import { prisma } from "./prismaClient";
import { Role, User } from "@prisma/client";

export const adminMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const id: string | null = req.auth.userId;
    if (!id) {
        res.status(404).json({ message: "User Id Not Found" });
        return;
    }

    const user: User | null = await prisma.user.findUnique({
        where: { id }
    });

    if (!user) {
        res.status(404).json({ message: "User Not Found" });
        return;
    }

    const role: Role | null = await prisma.role.findUnique({
        where: { id: user.role_id }
    });

    if (!role) {
        res.status(404).json({ message: "Role Not Found" });
        return;
    }

    if (role.role_name === "Admin") {
        next();
    } else {
        {
            res.status(404).json({ message: "No Permission" });
            return;
        }
    }
};
