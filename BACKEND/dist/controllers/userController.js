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
exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const prismaClient_1 = require("../prismaClient");
const getAllUsers = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield prismaClient_1.prisma.user.findMany();
        res.status(200).json({ allUsers, message: "All Users Found" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Falied" });
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
            res.status(200).json({ user, message: "User Found" });
        }
        else {
            res.status(404).json({ user, message: "User Not Found" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Falied" });
    }
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, address, clerk_id } = req.body;
        const exist = yield findUserByEmail(email);
        if (exist) {
            res.status(409).json({
                message: "User with this email already exists."
            });
        }
        else {
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
            res.status(201).json({ newUser, message: "User Created" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Falied" });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prismaClient_1.prisma.user;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Falied" });
    }
});
const deleteUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prismaClient_1.prisma.user;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Falied" });
    }
});
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prismaClient_1.prisma.user.findUnique({
        where: { email }
    });
    return user ? true : false;
});
