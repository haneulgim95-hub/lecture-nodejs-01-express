import express from "express";  /* 외부에 있는 걸 끌어와서 내가 사용하는 것*/

const router = express.Router();        // 라우터를(새로운 부서) 새로 생성


// 데이터베이스가 없어서 임시로 만든 데이터 변수 (mock)
const mockPosts = [
    { id: 8, title: "첫 번째 택배", content: "무사히 도착했습니다." },
    { id: 3, title: "두 번째 택배", content: "파손 주의해주세요!" },
    { id: 5, title: "세 번째 택배", content: "문 앞에 두고 가주세요." },
];

// 세번째 일꾼  -> 공장에서 라우터(새로운 부서)로 옮김
router.get("/posts", (req, res) => {
    // res.json(보낼데이터) 메소드 : string이 아닌, 객체 타입의 데이터(단, 함수 빼고) 를 보낼 때 사용
    // res.json 메소드를 사용하려면 app.use(express.json()) 을 꼭  써줘야 함
    res.json(mockPosts);
});    // -> 글목록을 주는 api


// 네번째 일꾼
// 경로를 "/"로 나눴을 때,
// /posts까지는 정해져 있고, 그 뒤 경로가 어떤 값이 들어올지 모를 때
// ":"를 붙이고, 이름표를 붙여줌 => id라고 하는 이름을 붙여줬다(이름 변경 가능)
// 예 ) /posts/1 => 여기에 걸리고, id가 1
// 예 ) /posts/300 => 여기에 걸리고, id가 300  -> 여기서 300은 string이다!
router.get("/posts/:id", (req,res) => {
    // 이렇게 가져온 저 "id"라는 값은
    // req.params.id 안에 있음  -> 이건 주소에서 가져온 값이라 string
    const targetId = Number(req.params.id);  /*숫자로 변환해서 변수에 담음*/
    // 1. 숫자값이 들어왔으면 정상적으로 형변환
    // 2. 문자값이 들어왔으면 NaN이 targetId에 저장되겠네?

    // 1. 정상
    // targetId를 가지고, mockPosts에서 해당하는 글(객체)를 찾아서 빈박스에 넣어야 함
    const result = mockPosts.find((value) => {
        // 첫 순회 : value = {id : 8, title: "...", content: "..."}
        // 2 순회 : value = {id : 3, title: "...", content: "..."}
        // 3 순회 : value = {id : 5, title: "...", content: "..."}
        return value.id === targetId;
    });     // 일치하는게 있으면 그 value가 반환되고, 없으면 undefined를 반환한다.

    // 1-1. 값이 반환 됐을 때
    // 1-2 값이 없을 때 -> 이건 value에 없는 값이 들어 왔을때와, NaN이 들어왔을 때 모두 해당한다!

    if (!result) {
        return res.status(404).json({message: "Posts not found."})
        // 404 not found 라는 에러를 내보냄.
        // .json은 우리가 보내는 자바스크립트 객체를 json 형식으로 바꿔주는 일
        // 우리가 json() 안에 매개변수에 넣어준 건, 자바스크립트 객체 => JSON문법을 써서 쓰는게 아니라, js 문법을 써서 씀
    }
    // result가 있을 때
    res.json({data: result});
});

export default router; /* router라는 변수(만) 내보내기. mockPosts라는 데이터는 외부에서 알 필요가 없다.*/