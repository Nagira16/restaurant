import express from "express";
import userRouter from "./routes/userRoutes";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

const app = express();

app.use(express.json());
app.use(ClerkExpressWithAuth());

app.get("/", (req, res) => {
    res.send({ messege: "worksss!!!" });
});

app.use("/user", userRouter);

export default app;
