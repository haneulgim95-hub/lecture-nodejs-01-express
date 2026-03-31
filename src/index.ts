
import express from "express";
import dotenv from "dotenv";
import path from "path";
import postRouter from "./routes/postRouter.ts";
import userRouter from "./routes/userRouter.ts";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));


app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(),"public", "login.html"));
})

app.use(postRouter);
app.use(userRouter);

app.listen( process.env.PORT , () => {
    console.log(`서버가 실행 되었습니다 http://localhost:${process.env.PORT}`);
})

