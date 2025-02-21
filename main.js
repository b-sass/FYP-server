import express from "express";
import connect from "./src/db.js";
import authRouter from "./src/routes/auth.js";

const app = express();
const port = process.env.PORT;

// Database connection
connect();

// Json parser
app.use(express.json());

// Login / Register API
app.use("/", authRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})