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
exports.deleteMenu = exports.updateMenu = exports.createMenu = exports.getMenuById = exports.getAllMenus = void 0;
const prismaClient_1 = require("../prismaClient");
const getAllMenus = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allMenus = yield prismaClient_1.prisma.menu.findMany();
        res.status(200).json({
            menus: allMenus,
            message: "Menus Found Successfully"
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Falied" });
    }
});
exports.getAllMenus = getAllMenus;
const getMenuById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const menu = yield prismaClient_1.prisma.menu.findUnique({
            where: { id }
        });
        if (menu) {
            res.status(200).json({ menu, message: "Menu Found Successfully" });
        }
        else {
            res.status(404).json({
                menu,
                message: "Menu Not Found Successfully"
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
    }
});
exports.getMenuById = getMenuById;
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
            menu: newMenu,
            message: "Menu Created Successfully"
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
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
            res.status(404).json({ menu, message: "Menu Not Found" });
            return;
        }
        let category_id;
        if (category_name) {
            const category = yield prismaClient_1.prisma.category.findUnique({
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
        const updatedMenu = yield prismaClient_1.prisma.menu.update({
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
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
            res.status(404).json({ message: "User Not Found" });
            return;
        }
        const deletedMenu = yield prismaClient_1.prisma.menu.delete({
            where: { id }
        });
        res.status(200).json({
            menu: deletedMenu,
            message: "Menu Deleted Successfully"
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
    }
});
exports.deleteMenu = deleteMenu;
