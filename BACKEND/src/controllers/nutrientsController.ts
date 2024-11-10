import { Nutrients, User } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../prismaClient";

export const getAllNutrients = async (
    _: Request,
    res: Response
): Promise<void> => {
    try {
        const allNutrients: Nutrients[] = await prisma.nutrients.findMany();

        res.status(200).json({
            nutrients: allNutrients,
            message: "Nutrients Found Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
};

export const getNutrientByMenuId = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const menu_id: string = req.params.id;

        const nutrient: Nutrients[] = await prisma.nutrients.findMany({
            where: { menu_id }
        });

        res.status(200).json({
            nutrient,
            message: "Nutrient Found Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
};

export const createNutrient = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {
            menu_id,
            calories,
            protein,
            carbohydrates,
            fats,
            fiber,
            sugar,
            sodium
        }: {
            menu_id: string;
            calories: number;
            protein: number;
            carbohydrates: number;
            fats: number;
            fiber: number;
            sugar: number;
            sodium: number;
        } = req.body;

        const newNutrient: Nutrients = await prisma.nutrients.create({
            data: {
                menu_id,
                calories,
                protein,
                carbohydrates,
                fats,
                fiber,
                sugar,
                sodium
            }
        });

        res.status(201).json({
            nutrient: newNutrient,
            message: "Nutrient Created Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
};

export const updateNutrient = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;
        const {
            menu_id,
            calories,
            protein,
            carbohydrates,
            fats,
            fiber,
            sugar,
            sodium
        }: {
            menu_id?: string;
            calories?: number;
            protein?: number;
            carbohydrates?: number;
            fats?: number;
            fiber?: number;
            sugar?: number;
            sodium?: number;
        } = req.body;

        const nutrient: Nutrients | null = await prisma.nutrients.findUnique({
            where: { id }
        });

        if (!nutrient) {
            res.status(404).json({
                nutrient,
                message: "Nutrient Not Found",
                success: false
            });
            return;
        }

        const updatedNutrient: Nutrients = await prisma.nutrients.update({
            where: { id: nutrient.id },
            data: {
                menu_id: menu_id || nutrient.menu_id,
                calories: calories || nutrient.calories,
                protein: protein || nutrient.protein,
                carbohydrates: carbohydrates || nutrient.carbohydrates,
                fats: fats || nutrient.fats,
                fiber: fiber || nutrient.fiber,
                sugar: sugar || nutrient.sugar,
                sodium: sodium || nutrient.sodium
            }
        });

        res.status(200).json({
            nutrient: updatedNutrient,
            message: "Nutrient Updated Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
};

export const deleteNutrient = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id: string = req.params.id;
        const nutrient: Nutrients | null = await prisma.nutrients.findUnique({
            where: { id }
        });

        if (!nutrient) {
            res.status(404).json({
                nutrient,
                message: "Nutrient Not Found",
                success: false
            });
            return;
        }

        const deletedNutrient: Nutrients = await prisma.nutrients.delete({
            where: { id: nutrient.id }
        });

        res.status(200).json({
            nutrient: deletedNutrient,
            message: "Nutrient Deleted Successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
};
