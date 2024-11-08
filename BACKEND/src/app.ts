import express from "express";
import userRouter from "./routes/userRoutes";
import { clerkMiddleware } from "@clerk/express";

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

app.use("/user", userRouter);

export default app;
