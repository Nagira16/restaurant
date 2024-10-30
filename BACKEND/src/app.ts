import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send({ messege: "worksss!!!" });
});

export default app;
