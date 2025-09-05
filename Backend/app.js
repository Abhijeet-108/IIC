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
import bookRouter from "./src/routes/book.route.js";
import bookChapterRoutes from "./routes/bookChapter.route.js";
import copyrightRoutes from "./routes/copyright.route.js";
import achievementRoutes from "./routes/achievement.route.js";
import eventRoutes from "./routes/event.route.js";

// routes
app.use("/api/v1/users", userRouter);
app.use("/api/books", bookRouter);
app.use("/api/bookchapters", bookChapterRoutes);
app.use("/api/copyrights", copyrightRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/events", eventRoutes);

export { app };