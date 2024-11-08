"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const menuRoutes_1 = __importDefault(require("./routes/menuRoutes"));
const tableRoutes_1 = __importDefault(require("./routes/tableRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const express_2 = require("@clerk/express");
const middleware_1 = require("./middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, express_2.clerkMiddleware)({
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY
}));
app.get("/", (req, res) => {
    res.send({ messege: "worksss!!!" });
});
app.use("/admin", middleware_1.adminMiddleware, adminRoutes_1.default);
app.use("/users", userRoutes_1.default);
app.use("/menus", menuRoutes_1.default);
app.use("/tables", tableRoutes_1.default);
exports.default = app;
