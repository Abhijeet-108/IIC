import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({extended: true})) 
app.use(express.static("public")) 
app.use(cookieParser())

// import routes
import userRouter from "./src/routes/user.route.js";
import postRouter from "./src/routes/post.route.js";

// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);


export { app };