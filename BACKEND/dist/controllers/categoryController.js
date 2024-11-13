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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getAllMenusByCategoryId = exports.getAllCategories = void 0;
const prismaClient_1 = require("../prismaClient");
const getAllCategories = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCategories = yield prismaClient_1.prisma.category.findMany();
        res.status(200).json({
            results: allCategories,
            message: "Categories Found Successfully",
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
exports.getAllCategories = getAllCategories;
const getAllMenusByCategoryId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category_id = req.params.id;
        const allMenus = yield prismaClient_1.prisma.menu.findMany({
            where: { category_id }
        });
        res.status(200).json({
            results: allMenus,
            message: "All Menus Found Successfully",
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
exports.getAllMenusByCategoryId = getAllMenusByCategoryId;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category_name } = req.body;
        const newCategory = yield prismaClient_1.prisma.category.create({
            data: {
                category_name
            }
        });
        res.status(201).json({
            results: newCategory,
            message: "Category Created Successfully",
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
exports.createCategory = createCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { category_name } = req.body;
        const category = yield prismaClient_1.prisma.category.findUnique({
            where: { id }
        });
        if (!category) {
            res.status(404).json({
                results: category,
                message: "Category Not Found",
                success: false
            });
            return;
        }
        const updatedCategory = yield prismaClient_1.prisma.category.update({
            where: { id: category.id },
            data: {
                category_name: category_name || category.category_name
            }
        });
        res.status(200).json({
            results: updatedCategory,
            message: "Category Updated Successfully",
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
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const category = yield prismaClient_1.prisma.category.findUnique({
            where: { id }
        });
        if (!category) {
            res.status(404).json({
                results: category,
                message: "Category Not Found",
                success: false
            });
            return;
        }
        const deletedCategory = yield prismaClient_1.prisma.category.delete({
            where: { id: category.id }
        });
        res.status(200).json({
            results: deletedCategory,
            message: "Category Deleted Successfully",
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
exports.deleteCategory = deleteCategory;
