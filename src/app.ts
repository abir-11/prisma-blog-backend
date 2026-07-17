import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors"
import config from "./config";
import { useRouter } from "./modules/users/users.route";
import { authRouter } from "./modules/auth/auth.router";
import { postRouter } from "./modules/post/post.route";
import { commentRouter } from "./modules/comment/comment.route";

const app: Application = express();

app.use(cors({
    origin: config.app_url,
    credentials: true,
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.get('/', async(req: Request, res: Response) => {
    res.send("Hello,world!");
})

app.use("/api/auth",useRouter);
app.use("/api/auth",authRouter);
app.use("/api/posts",postRouter);
app.use("/api/comments",commentRouter)

export default app;