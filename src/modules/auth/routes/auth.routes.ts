import { Router } from "express";
import { register, login } from "../controller/auth.controller.js";
import { refreshToken } from "../controller/auth.controller.js";
import { LoginLimiter } from "../../../utils/loginLimiter.js";
import { validate } from "../../../middlewares/validate.middleware.js";
import { createUserSchema } from "../validators/auth.validator.js";

const router = Router();

router.post('/register',validate(createUserSchema),register)
router.post('/login',validate(createUserSchema),login);
router.post("/refresh",refreshToken);

export default router;