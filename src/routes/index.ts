import { Router } from "express";
import postRoutes from "./post.routes.js"
import authRoutes from './auth.routes.js'
import aiRoutes from './ai.route.js'

const router = Router();

router.use('/posts',postRoutes);
router.use('/auth',authRoutes);
router.use('/ai',aiRoutes)

export default router;