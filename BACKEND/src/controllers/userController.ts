import { Role, User } from "@prisma/client";
import { prisma } from "../prismaClient";
import { Request, Response } from "express";

export const getAllUsers = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        // Check if current user role is Admin
        const user_id: string | null = req.auth?.userId;
        if (!user_id) return;

        const isAdmin: boolean = await adminAuth(user_id);
        if (!isAdmin) return;

        const allUsers: User[] = await prisma.user.findMany();

        res.status(200).json({
            users: allUsers,
            message: "Users Found Successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
    }
};

export const getUserById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;
        const user: User | null = await prisma.user.findUnique({
            where: { id }
        });
        if (user) {
            res.status(200).json({ user, message: "User Found Successfully" });
        } else {
            res.status(404).json({ user, message: "User Not Found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
    }
};

export const createUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {
            name,
            email,
            phone,
            address,
            clerk_id
        }: {
            name: string;
            email: string;
            phone: string;
            address: string;
            clerk_id: string;
        } = req.body;

        const exist: boolean = await findUserByEmail(email);
        if (exist) {
            res.status(409).json({
                message: "User with this email already exists."
            });
            return;
        }
        const role: Role | null = await prisma.role.findUnique({
            where: {
                role_name: "Customer"
            }
        });

        if (!role) {
            throw new Error("Role Customer Is Not Found");
        }

        const newUser: User = await prisma.user.create({
            data: {
                name,
                role_id: role.id,
                email,
                phone,
                address,
                clerk_id
            }
        });

        res.status(201).json({
            user: newUser,
            message: "User Created Successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
    }
};

export const updateUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;
        const {
            name,
            email,
            phone,
            address,
            clerk_id,
            role_name
        }: {
            name?: string;
            email?: string;
            phone?: string;
            address?: string;
            clerk_id?: string;
            role_name?: string;
        } = req.body;

        const user: User | null = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) {
            res.status(404).json({ user, message: "User Not Found" });
            return;
        }

        let role_id: string | undefined;
        if (role_name) {
            const role: Role | null = await prisma.role.findUnique({
                where: { role_name }
            });
            if (!role) {
                res.status(404).json({
                    message: `Role ${role_name} Not Found.`
                });
                return;
            }

            role_id = role.id;
        }

        const updatedUser: User = await prisma.user.update({
            where: { id },
            data: {
                name: name || user.name,
                email: email || user.email,
                phone: phone || user.phone,
                address: address || user.address,
                clerk_id: clerk_id || user.clerk_id,
                role_id: role_id || user.role_id
            }
        });

        res.status(200).json({
            user: updatedUser,
            message: "User Updated Successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
    }
};

export const deleteUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;
        const user: User | null = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) {
            res.status(404).json({ user, message: "User Not Found" });
            return;
        }

        const deletedUser: User = await prisma.user.delete({ where: { id } });

        res.status(200).json({
            user: deletedUser,
            message: "User Deleted Successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
    }
};

const findUserByEmail = async (email: string): Promise<boolean> => {
    const user: User | null = await prisma.user.findUnique({
        where: { email }
    });

    return user ? true : false;
};

export const adminAuth = async (user_id: string): Promise<boolean> => {
    const user: User | null = await prisma.user.findUnique({
        where: { id: user_id }
    });

    if (!user) return false;

    const role: Role | null = await prisma.role.findUnique({
        where: { id: user.role_id }
    });

    if (!role) return false;

    if (role.role_name === "Admin") return true;

    return false;
};
