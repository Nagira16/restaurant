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
exports.adminMiddleware = void 0;
const prismaClient_1 = require("./prismaClient");
const adminMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const clerk_id = req.auth.userId;
    if (!clerk_id) {
        res.status(401).json({
            results: null,
            message: "Unauthorized",
            success: false
        });
        return;
    }
    const user = yield prismaClient_1.prisma.user.findUnique({
        where: { clerk_id }
    });
    if (!user) {
        res.status(404).json({
            results: null,
            message: "User Not Found",
            success: false
        });
        return;
    }
    const role = yield prismaClient_1.prisma.role.findUnique({
        where: { id: user.role_id }
    });
    if (!role) {
        res.status(404).json({
            results: null,
            message: "Role Not Found",
            success: false
        });
        return;
    }
    if (role.role_name === "Admin") {
        next();
    }
    else {
        {
            res.status(403).json({
                results: null,
                message: "Forbidden: Admin only",
                success: false
            });
            return;
        }
    }
});
exports.adminMiddleware = adminMiddleware;
