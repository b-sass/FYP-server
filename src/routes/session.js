import express from "express";
import { VerifyToken } from "../middleware/token.js";
import session from "../controllers/session.js";

let router = express.Router();

router.post(
    "/session",
    VerifyToken,
    session.createSession
)

export default router;