import express from "express";
import postRoutes from "./routes/post.routes.js";
import routes from "./routes/index.js"
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors(({
    origin: 'http://localhost:3001',
    credentials: true
})))

app.use(cookieParser())
app.use(express.json());
app.use(routes);

app.use(errorMiddleware);

export default app;