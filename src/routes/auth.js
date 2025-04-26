import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const secret = process.env.TOKEN_SECRET;
const router = express.Router();

router.post(
    "/register",
    Register
);

router.post(
    "/login",
    Login
);

router.get(
    "/mfa",
    VerifyToken,
    Setup2FA
)

router.post(
    "/mfa",
    Verify2FA
)


export default router;