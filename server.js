import express from "express";

const app = express();
const port = 1984;

app.get("/user", (req, res) => {
    res.send("Hello world!");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})