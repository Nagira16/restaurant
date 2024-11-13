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
exports.deleteRole = exports.updateRole = exports.createRole = exports.getRoleById = exports.getAllRoles = void 0;
const prismaClient_1 = require("../prismaClient");
const getAllRoles = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allRoles = yield prismaClient_1.prisma.role.findMany();
        res.status(200).json({
            results: allRoles,
            message: "Roles Found Successfully",
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
exports.getAllRoles = getAllRoles;
const getRoleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const role = yield prismaClient_1.prisma.role.findUnique({
            where: { id }
        });
        if (role) {
            res.status(200).json({
                results: role,
                message: "Role Found Successfully",
                success: true
            });
        }
        else {
            res.status(404).json({
                results: role,
                message: "Role Not Found",
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
exports.getRoleById = getRoleById;
const createRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role_name } = req.body;
        const newRole = yield prismaClient_1.prisma.role.create({
            data: {
                role_name
            }
        });
        res.status(201).json({
            results: newRole,
            message: "Role Created Successfully",
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
exports.createRole = createRole;
const updateRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { role_name } = req.body;
        const role = yield prismaClient_1.prisma.role.findUnique({
            where: { id }
        });
        if (!role) {
            res.status(404).json({
                results: role,
                message: "Role Not Found",
                success: false
            });
            return;
        }
        const updatedRole = yield prismaClient_1.prisma.role.update({
            where: { id: role.id },
            data: {
                role_name
            }
        });
        res.status(200).json({
            results: updatedRole,
            message: "Role Updated Successfully",
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
exports.updateRole = updateRole;
const deleteRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const role = yield prismaClient_1.prisma.role.findUnique({
            where: { id }
        });
        if (!role) {
            res.status(404).json({
                results: role,
                message: "Role Not Found",
                success: false
            });
            return;
        }
        const deletedRole = yield prismaClient_1.prisma.role.delete({
            where: { id: role.id }
        });
        res.status(200).json({
            results: deletedRole,
            message: "Role Deleted Successfully",
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
exports.deleteRole = deleteRole;
