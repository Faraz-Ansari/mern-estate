import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to database successfully");
    })
    .catch((err) => {
        console.error(err);
    });

const app = express();

const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
