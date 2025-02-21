import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const secret = process.env.TOKEN_SECRET;
const router = express.Router();

router.post("/api/register", async (req, res) => {
    try {
        // Check if user with this email already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: "Account with this email already exists."});
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create new user
        const newUser = User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error." });
    }
});

router.post("/api/login", async (req, res) => {
    try {
        // Check email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ error: "User with this email does not exist." });
        }

        // Check password
        console.log(`password: ${req.body.password}\nhash: ${user.password}`)
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Wrong password." });
        }

        // Generate token
        const token = jwt.sign({ email: user.email }, secret);
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;