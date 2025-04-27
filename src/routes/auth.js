import express from "express";
import { Register, Login } from "../controllers/auth.js";
import { VerifyToken } from "../middleware/token.js";
import { Setup2FA, Verify2FA } from "../controllers/mfa.js";

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