import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import { Category, Menu } from "@prisma/client";
import { adminAuth } from "./userController";

export const getAllMenus = async (_: Request, res: Response): Promise<void> => {
    try {
        const allMenus: Menu[] = await prisma.menu.findMany();

        res.status(200).json({
            menus: allMenus,
            message: "Menus Found Successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Falied" });
    }
};

export const getMenuById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;
        const menu: Menu | null = await prisma.menu.findUnique({
            where: { id }
        });
        if (menu) {
            res.status(200).json({ menu, message: "Menu Found Successfully" });
        } else {
            res.status(404).json({
                menu,
                message: "Menu Not Found Successfully"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
    }
};

export const createMenu = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        // Check if current user role is Admin
        const user_id: string | null = req.auth?.userId;
        if (!user_id) return;

        const isAdmin: boolean = await adminAuth(user_id);
        if (!isAdmin) return;

        const {
            name,
            description,
            price,
            category_name,
            image
        }: {
            name: string;
            description: string;
            price: number;
            category_name: string;
            image: string;
        } = req.body;

        const category: Category | null = await prisma.category.findUnique({
            where: { category_name }
        });

        if (!category) {
            throw new Error(`Category ${category_name} Is Not Found`);
        }

        const newMenu: Menu = await prisma.menu.create({
            data: {
                name,
                description,
                price,
                category_id: category.id,
                image
            }
        });

        res.status(201).json({
            menu: newMenu,
            message: "Menu Created Successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
    }
};

export const updateMenu = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        // Check if current user role is Admin
        const user_id: string | null = req.auth?.userId;
        if (!user_id) return;

        const isAdmin: boolean = await adminAuth(user_id);
        if (!isAdmin) return;

        const id: string = req.params.id;
        const {
            name,
            description,
            price,
            category_name,
            image
        }: {
            name?: string;
            description?: string;
            price?: number;
            category_name?: string;
            image?: string;
        } = req.body;

        const menu: Menu | null = await prisma.menu.findUnique({
            where: { id }
        });

        if (!menu) {
            res.status(404).json({ menu, message: "Menu Not Found" });
            return;
        }

        let category_id: string | undefined;
        if (category_name) {
            const category: Category | null = await prisma.category.findUnique({
                where: { category_name }
            });
            if (!category) {
                res.status(404).json({
                    message: `Category ${category_name} Not Found`
                });
                return;
            }

            category_id = category.id;
        }

        const updatedMenu: Menu = await prisma.menu.update({
            where: { id },
            data: {
                name: name || menu.name,
                description: description || menu.description,
                price: price || menu.price,
                category_id: category_id || menu.category_id,
                image: image || menu.image
            }
        });

        res.status(200).json({
            menu: updatedMenu,
            message: "Menu Updated Successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
    }
};

export const deleteMenu = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        // Check if current user role is Admin
        const user_id: string | null = req.auth?.userId;
        if (!user_id) return;

        const isAdmin: boolean = await adminAuth(user_id);
        if (!isAdmin) return;

        const id: string = req.params.id;
        const menu: Menu | null = await prisma.menu.findUnique({
            where: { id }
        });

        if (!menu) {
            res.status(404).json({ message: "User Not Found" });
            return;
        }

        const deletedMenu: Menu = await prisma.menu.delete({
            where: { id }
        });

        res.status(200).json({
            menu: deletedMenu,
            message: "Menu Deleted Successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
    }
};
