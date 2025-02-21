import express from "express";
import getAllUsers from "./src/db.js";

const app = express();
const port = 1984;

app.get("/user", (req, res) => {
    getAllUsers();
    
    // console.log(users[0])
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})