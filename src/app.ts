import express from "express";
import airoute from "./modules/ai/routes/ai.routes.js"
import authroute from "./modules/auth/routes/auth.routes.js"
import postroute from "./modules/post/routes/post.routes.js"
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(
  cors({
    origin: "http://13.57.33.2",
    credentials: true,
  })
);

app.use(cookieParser())
app.use(express.json());
app.use("/auth",authroute);
app.use("/posts",postroute);
app.use("/ai",airoute);

app.use(errorMiddleware);

export default app;