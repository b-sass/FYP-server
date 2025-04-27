import express from "express";
import authRouter from "./routes/auth.js";
import sessionRouter from "./routes/session.js";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT;

// Database connection
mongoose.promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.DB_URL)
    .then(console.log("Connected to database."))
    .catch((err) => console.log(err));

// Express settings
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api", sessionRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})