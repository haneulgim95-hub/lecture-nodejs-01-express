import express from "express";
import dotenv from "dotenv";

// 1. 환경 변수 초기화
dotenv.config();

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





// 데이터베이스가 없어서 임시로 만든 데이터 변수 (mock)
const mockPosts = [
    { id: 1, title: "첫 번째 택배", content: "무사히 도착했습니다." },
    { id: 2, title: "두 번째 택배", content: "파손 주의해주세요!" },
    { id: 3, title: "세 번째 택배", content: "문 앞에 두고 가주세요." },
];


// 첫번째 일꾼
// app.get("/", () => {})
// "/"로 들어왔을 때 동작되는 일꾼
app.get("/", (req,res) => {
    // res.send() 메소드는 string을 내보낼 때 사용
    res.send("여기는 루트입니다.");
})

// 두번째 일꾼
app.get("/hello", (req, res) => {
    res.send("여기는 hello 주소로 들어왔습니다.");
})

// 세번째 일꾼
app.get("/posts", (req, res) => {
    // res.json(보낼데이터) 메소드 : string이 아닌, 객체 타입의 데이터(단, 함수 빼고) 를 보낼 때 사용
    // res.json 메소드를 사용하려면 app.use(express.json()) 을 꼭  써줘야 함
    res.json(mockPosts);
});    // -> 글목록을 주는 api



// 3. app.listen : 서버를 실행하는 메소드
//      매개변수 2 개 (포트번호, 함수)
app.listen(3000, () => {
    // 얘가 실행되면 처음 할 일
    console.log("서버가 실행 되었습니다. http://localhost:3000");
})

