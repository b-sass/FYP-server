import express from "express";
import { VerifyToken } from "../middleware/token.js";
import session from "../controllers/session.js";

let router = express.Router();

router.get(
    "/session",
    VerifyToken,
    session.getSessions
)

router.post(
    "/session",
    VerifyToken,
    session.createSession
)

router.put(
    "/session",
    VerifyToken,
    session.updateSession
)

export default router;