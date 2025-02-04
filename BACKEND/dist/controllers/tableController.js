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
exports.deleteTable = exports.updateTable = exports.createTable = exports.getTableById = exports.getAllTables = void 0;
const prismaClient_1 = require("../prismaClient");
const getAllTables = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTable = yield prismaClient_1.prisma.table.findMany();
        res.status(200).json({
            results: allTable,
            message: "Tables Found Successfully",
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
exports.getAllTables = getAllTables;
const getTableById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const table = yield prismaClient_1.prisma.table.findUnique({
            where: { id }
        });
        if (table) {
            res.status(200).json({
                results: table,
                message: "Table Found Successfully",
                success: true
            });
        }
        else {
            res.status(404).json({
                results: table,
                message: "Table Not Found",
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
exports.getTableById = getTableById;
const createTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { number, capacity, available } = req.body;
        const newTable = yield prismaClient_1.prisma.table.create({
            data: {
                number,
                capacity,
                available
            }
        });
        res.status(201).json({
            results: newTable,
            message: "Table Created Successfully",
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
exports.createTable = createTable;
const updateTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { number, capacity, available } = req.body;
        const table = yield prismaClient_1.prisma.table.findUnique({
            where: { id }
        });
        if (!table) {
            res.status(404).json({
                results: table,
                message: "Table Not Found",
                success: false
            });
            return;
        }
        const updatedTable = yield prismaClient_1.prisma.table.update({
            where: { id: table.id },
            data: {
                number: number || table.number,
                capacity: capacity || table.capacity,
                available: available || table.available
            }
        });
        res.status(200).json({
            results: updatedTable,
            message: "Table Updated Successfully",
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
exports.updateTable = updateTable;
const deleteTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const table = yield prismaClient_1.prisma.table.findUnique({
            where: { id }
        });
        if (!table) {
            res.status(404).json({
                results: table,
                message: "Table Not Found",
                success: false
            });
            return;
        }
        const deletedTable = yield prismaClient_1.prisma.table.delete({
            where: { id: table.id }
        });
        res.status(200).json({
            results: deletedTable,
            message: "Table Deleted Successfully",
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
exports.deleteTable = deleteTable;
