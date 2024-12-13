import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import { Category, Menu } from "@prisma/client";
import { MenuWithCategoryName } from "../types";

export const getAllMenus = async (_: Request, res: Response): Promise<void> => {
    try {
        const allMenus: Menu[] = await prisma.menu.findMany();

        res.status(200).json({
            results: allMenus,
            message: "Menus Found Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Falied",
            success: false
        });
    }
};

export const getAllMenusWithCategoryName = async (
    _: Request,
    res: Response
): Promise<void> => {
    try {
        const allMenus: MenuWithCategoryName[] = await prisma.menu.findMany({
            include: {
                category: {
                    select: {
                        category_name: true
                    }
                }
            }
        });

        res.status(200).json({
            results: allMenus,
            message: "Menus Found Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Falied",
            success: false
        });
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
            res.status(200).json({
                results: menu,
                message: "Menu Found Successfully",
                success: true
            });
        } else {
            res.status(404).json({
                results: menu,
                message: "Menu Not Found Successfully",
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

export const getMenuWithCategoryNameById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;
        const menu: MenuWithCategoryName | null = await prisma.menu.findUnique({
            where: { id },
            include: {
                category: {
                    select: {
                        category_name: true
                    }
                }
            }
        });
        if (menu) {
            res.status(200).json({
                results: menu,
                message: "Menu Found Successfully",
                success: true
            });
        } else {
            res.status(404).json({
                results: menu,
                message: "Menu Not Found Successfully",
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

export const createMenu = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        // Check if current user role is Admin

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
            results: newMenu,
            message: "Menu Created Successfully",
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

export const updateMenu = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        // Check if current user role is Admin

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
            res.status(404).json({
                results: menu,
                message: "Menu Not Found",
                success: false
            });
            return;
        }

        let category_id: string | undefined;
        if (category_name) {
            const category: Category | null = await prisma.category.findUnique({
                where: { category_name }
            });
            if (!category) {
                res.status(404).json({
                    results: null,
                    message: `Category ${category_name} Not Found`,
                    success: false
                });
                return;
            }

            category_id = category.id;
        }

        const updatedMenu: Menu = await prisma.menu.update({
            where: { id: menu.id },
            data: {
                name: name || menu.name,
                description: description || menu.description,
                price: price || menu.price,
                category_id: category_id || menu.category_id,
                image: image || menu.image
            }
        });

        res.status(200).json({
            results: updatedMenu,
            message: "Menu Updated Successfully",
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

export const deleteMenu = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        // Check if current user role is Admin

        const id: string = req.params.id;
        const menu: Menu | null = await prisma.menu.findUnique({
            where: { id }
        });

        if (!menu) {
            res.status(404).json({
                results: null,
                message: "User Not Found",
                success: false
            });
            return;
        }

        const deletedMenu: Menu = await prisma.menu.delete({
            where: { id: menu.id }
        });

        res.status(200).json({
            results: deletedMenu,
            message: "Menu Deleted Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
};
