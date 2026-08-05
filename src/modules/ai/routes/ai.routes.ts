import { Router } from "express";
import { generateContent } from "../controller/ai.controller.js";
import { authMiddleware } from "../../../middlewares/auth.middleware.js";

const router = Router()

router.post(
    '/generate',
    authMiddleware,
    generateContent);

export default router;