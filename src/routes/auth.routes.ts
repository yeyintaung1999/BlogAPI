import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { refreshToken } from "../controllers/auth.controller";
import { LoginLimiter } from "../utils/loginLimiter";

const router = Router()

router.post('/register',register)
router.post(
    '/login',
    LoginLimiter,
    login)
router.post(
    "/refresh",
    refreshToken
);

export default router;