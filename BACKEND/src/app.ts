import express from "express";
import userRouter from "./routes/userRoutes";
import menuRouter from "./routes/menuRoutes";
import tablesRouter from "./routes/tableRoutes";
import adminRouter from "./routes/adminRoutes";
import { clerkMiddleware } from "@clerk/express";
import { adminMiddleware } from "./middleware";

const app = express();

app.use(express.json());
app.use(
    clerkMiddleware({
        publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        secretKey: process.env.CLERK_SECRET_KEY
    })
);

app.get("/", (req, res) => {
    res.send({ messege: "worksss!!!" });
});

app.use("/admin", adminMiddleware, adminRouter);
app.use("/users", userRouter);
app.use("/menus", menuRouter);
app.use("/tables", tablesRouter);

export default app;
