import { Category, Menu, User } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import { findUserByClerkId } from "./userController";

export const getAllCategories = async (
    _: Request,
    res: Response
): Promise<void> => {
    try {
        const allCategories: Category[] = await prisma.category.findMany();

        res.status(200).json({
            categories: allCategories,
            message: "Categories Found Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
};

export const getAllMenusByCategoryId = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const category_id: string = req.params.id;

        const allMenus: Menu[] = await prisma.menu.findMany({
            where: { category_id }
        });

        res.status(200).json({
            menus: allMenus,
            message: "All Menus Found Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
};

export const createCategory = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { category_name }: { category_name: string } = req.body;

        const newCategory: Category = await prisma.category.create({
            data: {
                category_name
            }
        });

        res.status(201).json({
            Category: newCategory,
            message: "Category Created Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
};

export const updateCategory = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;
        const { category_name }: { category_name?: string } = req.body;

        const category: Category | null = await prisma.category.findUnique({
            where: { id }
        });

        if (!category) {
            res.status(404).json({
                category,
                message: "Category Not Found",
                success: false
            });
            return;
        }

        const updatedCategory: Category = await prisma.category.update({
            where: { id: category.id },
            data: {
                category_name: category_name || category.category_name
            }
        });

        res.status(200).json({
            category: updatedCategory,
            message: "Category Updated Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
};

export const deleteCategory = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;
        const category: Category | null = await prisma.category.findUnique({
            where: { id }
        });

        if (!category) {
            res.status(404).json({
                category,
                message: "Category Not Found",
                success: false
            });
            return;
        }

        const deletedCategory: Category = await prisma.category.delete({
            where: { id: category.id }
        });

        res.status(200).json({
            category: deletedCategory,
            message: "Category Deleted Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
};
