import express from "express";
import dotenv from "dotenv";

// 1. 환경 변수 초기화
dotenv.config();

// 2. Express 앱 생성
const app = express();

app.get("/", (req,res) => {
    res.send("<h1>Express 서버</h1><div>이렇게 쓰는건 너무 힘드네요</div>");
})

// 3. app.listen : 서버를 실행하는 메소드
//      매개변수 2 개 (포트번호, 함수)
app.listen(3000, () => {
    // 얘가 실행되면 처음 할 일
    console.log("서버가 실행 되었습니다. http://localhost:3000");
})

