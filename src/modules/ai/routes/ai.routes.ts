import { Router } from "express";
import { generateContent } from "../controller/ai.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";

const router = Router()

router.post(
    '/generate',
    authMiddleware,
    generateContent);

export default router;