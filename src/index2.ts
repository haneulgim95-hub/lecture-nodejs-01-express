import express from "express";
import dotenv from "dotenv";
import postRouter2 from "./routs2/postRouter2.ts";

dotenv.config();

const app = express();
app.use(express.json());

app.use(postRouter2)


app.get("/", (req, res) => {
    res.send("여기는 루트입니다.")
})

app.get("/hello", (req, res) => {
    res.send("반갑습니다.")
})



app.listen(process.env.PORT, () => {
    console.log(`서버가 실행 되었습니다. http://localhost:${process.env.PORT}`);
})