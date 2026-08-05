import { Router } from "express";
import { register, login } from "../controller/auth.controller";
import { refreshToken } from "../controller/auth.controller";
import { LoginLimiter } from "../../../utils/loginLimiter";
import { validate } from "../../../middlewares/validate.middleware";
import { createUserSchema } from "../validators/auth.validator";

const router = Router();

router.post('/register',validate(createUserSchema),register)
router.post('/login',validate(createUserSchema),login);
router.post("/refresh",refreshToken);

export default router;