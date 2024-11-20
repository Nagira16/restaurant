"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNutrient = exports.updateNutrient = exports.createNutrient = exports.getNutrientByMenuId = exports.getAllNutrients = void 0;
const prismaClient_1 = require("../prismaClient");
const getAllNutrients = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allNutrients = yield prismaClient_1.prisma.nutrients.findMany();
        res.status(200).json({
            results: allNutrients,
            message: "Nutrients Found Successfully",
            success: true
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Failed",
            success: false
        });
    }
});
exports.getAllNutrients = getAllNutrients;
const getNutrientByMenuId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menu_id = req.params.id;
        const nutrient = yield prismaClient_1.prisma.nutrients.findUnique({
            where: { menu_id }
        });
        if (nutrient) {
            res.status(200).json({
                results: nutrient,
                message: "Nutrient Found Successfully",
                success: true
            });
        }
        else {
            res.status(404).json({
                results: nutrient,
                message: "Nutrient Not Found",
                success: false
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Failed",
            success: false
        });
    }
});
exports.getNutrientByMenuId = getNutrientByMenuId;
const createNutrient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { menu_id, calories, protein, carbohydrates, fats, fiber, sugar, sodium } = req.body;
        const newNutrient = yield prismaClient_1.prisma.nutrients.create({
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
            results: newNutrient,
            message: "Nutrient Created Successfully",
            success: true
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Failed",
            success: false
        });
    }
});
exports.createNutrient = createNutrient;
const updateNutrient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { menu_id, calories, protein, carbohydrates, fats, fiber, sugar, sodium } = req.body;
        const nutrient = yield prismaClient_1.prisma.nutrients.findUnique({
            where: { id }
        });
        if (!nutrient) {
            res.status(404).json({
                results: nutrient,
                message: "Nutrient Not Found",
                success: false
            });
            return;
        }
        const updatedNutrient = yield prismaClient_1.prisma.nutrients.update({
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
            results: updatedNutrient,
            message: "Nutrient Updated Successfully",
            success: true
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Failed",
            success: false
        });
    }
});
exports.updateNutrient = updateNutrient;
const deleteNutrient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const nutrient = yield prismaClient_1.prisma.nutrients.findUnique({
            where: { id }
        });
        if (!nutrient) {
            res.status(404).json({
                results: nutrient,
                message: "Nutrient Not Found",
                success: false
            });
            return;
        }
        const deletedNutrient = yield prismaClient_1.prisma.nutrients.delete({
            where: { id: nutrient.id }
        });
        res.status(200).json({
            results: deletedNutrient,
            message: "Nutrient Deleted Successfully",
            success: true
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Failed",
            success: false
        });
    }
});
exports.deleteNutrient = deleteNutrient;
