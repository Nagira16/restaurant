import { NextFunction, Request, Response } from "express";
import { prisma } from "./prismaClient";
import { Role, User } from "@prisma/client";

export const adminMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | Response> => {
    const id: string | null = req.auth.userId;
    if (!id) return res.status(404).json({ message: "User Id Not Found" });

    const user: User | null = await prisma.user.findUnique({
        where: { id }
    });

    if (!user) return res.status(404).json({ message: "User Not Found" });

    const role: Role | null = await prisma.role.findUnique({
        where: { id: user.role_id }
    });

    if (!role) return res.status(404).json({ message: "Role Not Found" });

    if (role.role_name === "Admin") {
        next();
    } else {
        return res.status(404).json({ message: "No Permission" });
    }
};
