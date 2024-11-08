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
    const id = req.auth.userId;
    if (!id)
        return res.status(404).json({ message: "User Id Not Found" });
    const user = yield prismaClient_1.prisma.user.findUnique({
        where: { id }
    });
    if (!user)
        return res.status(404).json({ message: "User Not Found" });
    const role = yield prismaClient_1.prisma.role.findUnique({
        where: { id: user.role_id }
    });
    if (!role)
        return res.status(404).json({ message: "Role Not Found" });
    if (role.role_name === "Admin") {
        next();
    }
    else {
        return res.status(404).json({ message: "No Permission" });
    }
});
exports.adminMiddleware = adminMiddleware;
