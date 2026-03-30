import express from "express";
import dotenv from "dotenv";
import postRouter from "./routes/postRouter.ts";
import userRouter from "./routes/userRouter.ts";
import path from "path";   /* postRouter를 가져온다. */

dotenv.config();
// 1. 환경 변수 초기화 -> 환경변수를 불러오게끔 한다. 파일 맨 위에 작성. 한번만 불러오면 된다.

// 2. Express 앱 생성
const app = express();
app.use(express.json());    // app.use() 메소드는 미들웨어(중간에 끼워 넣는 프로그램)를 사용하게 할 때 사용
                            // 여기서 미들웨어는 express.json()이다.
                            // x-ray라던지 방사능 검사기라 던지..
                            // express.json() = "클라이언트가 보낸 JSON을 읽기 쉽게 변환해주는 도구"

/*
👉 "요청(Request)의 body를 JSON 형태로 해석해주는 미들웨어를 등록하는 것"

const app = express();
app.use(express.json());

이 코드의 의미:

express.json() 👉 JSON 파싱 미들웨어
app.use(...) 👉 모든 요청에 이 기능 적용

즉,
👉 클라이언트가 보내는 JSON 데이터를
👉 자동으로 req.body에 넣어준다

전체 흐름은 이거야:

[프론트] → JSON 데이터 전송
        ↓
[서버] express.json()이 해석
        ↓
req.body에 담김
        ↓
그걸 가지고 DB에 저장 or 로직 처리


💡 한 줄 정리
👉 express.json() = "클라이언트가 보낸 JSON을 읽기 쉽게 변환해주는 도구"
여기서 👉 mockPosts 안의 요소들 = JS 객체 , 👉 JSON = 그걸 문자열로 바꾼 것
 */

//express.static(열어줄 경로) : 정적 파일들을 제공하는 미들웨어
app.use(express.static(path.join(process.cwd(), "public")));


// 첫번째 일꾼
// app.get("/", () => {})
// "/"로 들어왔을 때 동작되는 일꾼
app.get("/", (req,res) => {
    // res.sendFile(파일경로) : 응답에 file 내용을 담아서 전달
    // path.join(경로1, 경로2. 경로3 ...) : 경로를 합쳐주는 메소드
    // process.cwd() : 현재 실행중인 Node.js 프로세스가 실행되는 디렉토리 경로를 반환
    res.sendFile(path.join(process.cwd(), "public", "login.html"));
})

// 두번째 일꾼
app.get("/hello", (req, res) => {
    res.send("여기는 hello 주소로 들어왔습니다.");
})

app.use(postRouter);
app.use(userRouter);


// 3. app.listen : 서버를 실행하는 메소드 (공장 오픈과 마찬가지이다!)
//      매개변수 2 개 (포트번호, 함수)
app.listen(process.env.PORT, () => {
    // 얘가 실행되면 처음 할 일
    console.log(`서버가 실행 되었습니다. http://localhost:${process.env.PORT}`);
});

