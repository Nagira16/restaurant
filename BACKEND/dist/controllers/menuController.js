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
exports.deleteMenu = exports.updateMenu = exports.createMenu = exports.getMenuWithCategoryNameById = exports.getMenuById = exports.getAllMenusWithCategoryName = exports.getAllMenus = void 0;
const prismaClient_1 = require("../prismaClient");
const getAllMenus = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allMenus = yield prismaClient_1.prisma.menu.findMany();
        res.status(200).json({
            results: allMenus,
            message: "Menus Found Successfully",
            success: true
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Falied",
            success: false
        });
    }
});
exports.getAllMenus = getAllMenus;
const getAllMenusWithCategoryName = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allMenus = yield prismaClient_1.prisma.menu.findMany({
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            results: null,
            message: "Server Falied",
            success: false
        });
    }
});
exports.getAllMenusWithCategoryName = getAllMenusWithCategoryName;
const getMenuById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const menu = yield prismaClient_1.prisma.menu.findUnique({
            where: { id }
        });
        if (menu) {
            res.status(200).json({
                results: menu,
                message: "Menu Found Successfully",
                success: true
            });
        }
        else {
            res.status(404).json({
                results: menu,
                message: "Menu Not Found Successfully",
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
exports.getMenuById = getMenuById;
const getMenuWithCategoryNameById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const menu = yield prismaClient_1.prisma.menu.findUnique({
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
        }
        else {
            res.status(404).json({
                results: menu,
                message: "Menu Not Found Successfully",
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
exports.getMenuWithCategoryNameById = getMenuWithCategoryNameById;
const createMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if current user role is Admin
        const { name, description, price, category_name, image } = req.body;
        const category = yield prismaClient_1.prisma.category.findUnique({
            where: { category_name }
        });
        if (!category) {
            throw new Error(`Category ${category_name} Is Not Found`);
        }
        const newMenu = yield prismaClient_1.prisma.menu.create({
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
exports.createMenu = createMenu;
const updateMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if current user role is Admin
        const id = req.params.id;
        const { name, description, price, category_name, image } = req.body;
        const menu = yield prismaClient_1.prisma.menu.findUnique({
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
        let category_id;
        if (category_name) {
            const category = yield prismaClient_1.prisma.category.findUnique({
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
        const updatedMenu = yield prismaClient_1.prisma.menu.update({
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
exports.updateMenu = updateMenu;
const deleteMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if current user role is Admin
        const id = req.params.id;
        const menu = yield prismaClient_1.prisma.menu.findUnique({
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
        const deletedMenu = yield prismaClient_1.prisma.menu.delete({
            where: { id: menu.id }
        });
        res.status(200).json({
            results: deletedMenu,
            message: "Menu Deleted Successfully",
            success: true
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
});
exports.deleteMenu = deleteMenu;
