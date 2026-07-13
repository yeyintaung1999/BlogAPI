import { Router } from "express";
import { getPosts,addPost, getPost } from "../controllers/post.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
    '/get_all_post', 
    authMiddleware,
    getPosts);

router.post(
    '/create_post', 
    authMiddleware,
    addPost);

router.get(
    '/all_posts/:id',
    authMiddleware,
    getPost
);

export default router;