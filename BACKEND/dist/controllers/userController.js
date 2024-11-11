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
exports.findUserByClerkId = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const prismaClient_1 = require("../prismaClient");
const getAllUsers = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if current user role is Admin
        const allUsers = yield prismaClient_1.prisma.user.findMany();
        res.status(200).json({
            users: allUsers,
            message: "Users Found Successfully",
            success: true
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield prismaClient_1.prisma.user.findUnique({
            where: { id }
        });
        if (user) {
            res.status(200).json({
                user,
                message: "User Found Successfully",
                success: true
            });
        }
        else {
            res.status(404).json({
                user,
                message: "User Not Found",
                success: false
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
    }
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, address, clerk_id } = req.body;
        const exist = yield findUserByEmail(email);
        if (exist) {
            res.status(409).json({
                message: "User with this email already exists.",
                success: false
            });
            return;
        }
        const role = yield prismaClient_1.prisma.role.findUnique({
            where: {
                role_name: "Customer"
            }
        });
        if (!role) {
            throw new Error("Role Customer Is Not Found");
        }
        const newUser = yield prismaClient_1.prisma.user.create({
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
            message: "User Created Successfully",
            success: true
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { name, email, phone, address, role_name } = req.body;
        const user = yield prismaClient_1.prisma.user.findUnique({
            where: { id }
        });
        if (!user) {
            res.status(404).json({
                user,
                message: "User Not Found",
                success: false
            });
            return;
        }
        let role_id;
        if (role_name) {
            const role = yield prismaClient_1.prisma.role.findUnique({
                where: { role_name }
            });
            if (!role) {
                res.status(404).json({
                    message: `Role ${role_name} Not Found.`,
                    success: false
                });
                return;
            }
            role_id = role.id;
        }
        const updatedUser = yield prismaClient_1.prisma.user.update({
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
            user: updatedUser,
            message: "User Updated Successfully",
            success: true
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed", success: false });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield prismaClient_1.prisma.user.findUnique({
            where: { id }
        });
        if (!user) {
            res.status(404).json({ user, message: "User Not Found" });
            return;
        }
        const deletedUser = yield prismaClient_1.prisma.user.delete({
            where: { id: user.id }
        });
        res.status(200).json({
            user: deletedUser,
            message: "User Deleted Successfully"
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Failed" });
    }
});
exports.deleteUser = deleteUser;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prismaClient_1.prisma.user.findUnique({
        where: { email }
    });
    return user ? true : false;
});
const findUserByClerkId = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const clerk_id = req.auth.userId;
    if (!clerk_id) {
        return null;
    }
    const user = yield prismaClient_1.prisma.user.findUnique({
        where: { clerk_id }
    });
    return user ? user : null;
});
exports.findUserByClerkId = findUserByClerkId;
