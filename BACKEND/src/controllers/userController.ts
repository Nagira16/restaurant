import { Role, User } from "@prisma/client";
import { prisma } from "../prismaClient";
import { Request, Response } from "express";
import { UserWithRoleName } from "../types";

export const getAllUsers = async (_: Request, res: Response): Promise<void> => {
    try {
        // Check if current user role is Admin

        const allUsers: UserWithRoleName[] = await prisma.user.findMany({
            include: {
                role: {
                    select: {
                        role_name: true
                    }
                }
            }
        });

        res.status(200).json({
            results: allUsers,
            message: "Users Found Successfully",
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

export const getUserByClerkId = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const clerk_id: string = req.params.id;

        const user: UserWithRoleName | null = await prisma.user.findUnique({
            where: { clerk_id },
            include: {
                role: {
                    select: {
                        role_name: true
                    }
                }
            }
        });

        if (user) {
            res.status(200).json({
                results: user,
                message: "User Found Successfully",
                success: true
            });
        } else {
            res.status(404).json({
                results: user,
                message: "User Not Found",
                success: false
            });
        }
    } catch (error) {
        res.status(500).json({
            results: null,
            message: "Server Failed",
            success: false
        });
    }
};

export const getUserById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;

        const user: UserWithRoleName | null = await prisma.user.findUnique({
            where: { id },
            include: {
                role: {
                    select: {
                        role_name: true
                    }
                }
            }
        });

        if (user) {
            res.status(200).json({
                results: user,
                message: "User Found Successfully",
                success: true
            });
        } else {
            res.status(404).json({
                results: user,
                message: "User Not Found",
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
            image,
            clerk_id
        }: {
            name: string;
            email: string;
            phone: string;
            address: string;
            image: string;
            clerk_id: string;
        } = req.body;

        const emailExist: UserWithRoleName | null = await findUserByEmail(
            email
        );

        if (emailExist) {
            res.status(409).json({
                results: emailExist,
                message: "User already exists.",
                success: false
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
                image,
                clerk_id
            }
        });

        const userWithRole: UserWithRoleName = {
            ...newUser,
            role: { role_name: "Customer" }
        };

        res.status(201).json({
            results: userWithRole,
            message: "User Created Successfully",
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
            role_name
        }: {
            name?: string;
            email?: string;
            phone?: string;
            address?: string;
            role_name?: string;
        } = req.body;

        const user: User | null = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) {
            res.status(404).json({
                results: user,
                message: "User Not Found",
                success: false
            });
            return;
        }

        let role_id: string | undefined;
        if (role_name) {
            const role: Role | null = await prisma.role.findUnique({
                where: { role_name }
            });
            if (!role) {
                res.status(404).json({
                    results: null,
                    message: `Role ${role_name} Not Found.`,
                    success: false
                });
                return;
            }

            role_id = role.id;
        }

        const updatedUser: User = await prisma.user.update({
            where: { id: user.id },
            data: {
                name: name || user.name,
                email: email || user.email,
                phone: phone || user.phone,
                address: address || user.address,
                role_id: role_id || user.role_id
            }
        });

        res.status(200).json({
            results: updatedUser,
            message: "User Updated Successfully",
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
            res.status(404).json({
                results: user,
                message: "User Not Found",
                success: false
            });
            return;
        }

        const deletedUser: User = await prisma.user.delete({
            where: { id: user.id }
        });

        res.status(200).json({
            results: deletedUser,
            message: "User Deleted Successfully",
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

const findUserByEmail = async (
    email: string
): Promise<UserWithRoleName | null> => {
    const user: UserWithRoleName | null = await prisma.user.findUnique({
        where: { email },
        include: {
            role: {
                select: {
                    role_name: true
                }
            }
        }
    });

    return user;
};

export const findUserByClerkId = async (req: Request): Promise<User | null> => {
    const clerk_id: string | null = req.auth.userId;

    if (!clerk_id) {
        return null;
    }
    const user: User | null = await prisma.user.findUnique({
        where: { clerk_id }
    });

    return user ? user : null;
};
