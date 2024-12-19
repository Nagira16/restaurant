import express from "express";
import userRouter from "./routes/userRoutes";
import menuRouter from "./routes/menuRoutes";
import tablesRouter from "./routes/tableRoutes";
import rolesRouter from "./routes/roleRoutes";
import reviewsRouter from "./routes/reviewRoutes";
import reservationRouter from "./routes/reservationRoutes";
import paymentRouter from "./routes/paymentRoutes";
import orderDetailsRouter from "./routes/orderDetailsRoutes";
import nutrientsRouter from "./routes/nutrientsRoutes";
import categoriesRouter from "./routes/categoryRoutes";
import itemOrderDetailsRouter from "./routes/itemOrderDetailsRoutes";
import adminRouter from "./routes/adminRoutes";
import { clerkMiddleware } from "@clerk/express";
import { adminMiddleware } from "./middleware";
import cron from "node-cron";
import cros from "cors";
import { updateTableAvailability } from "./controllers/reservationController";

const app = express();

app.use(express.json());
app.use(
    cros({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        exposedHeaders: ["Cache-Control"]
    })
);
app.use(
    clerkMiddleware({
        publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        secretKey: process.env.CLERK_SECRET_KEY
    })
);

cron.schedule("* * * * *", () => {
    console.log("Checking and updating table availability...");
    updateTableAvailability();
});

app.get("/", (req, res) => {
    res.send({ messege: "worksss!!!" });
});

app.use("/admin", adminMiddleware, adminRouter);
app.use("/users", userRouter);
app.use("/menus", menuRouter);
app.use("/tables", tablesRouter);
app.use("/roles", rolesRouter);
app.use("/reviews", reviewsRouter);
app.use("/reservations", reservationRouter);
app.use("/payments", paymentRouter);
app.use("/orderDetails", orderDetailsRouter);
app.use("/nutrients", nutrientsRouter);
app.use("/categories", categoriesRouter);
app.use("/itemOrderDetails", itemOrderDetailsRouter);

export default app;
