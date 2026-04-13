import express from "express";  /* 외부에 있는 걸 끌어와서 내가 사용하는 것*/

const router = express.Router();
router.use(express.json());
// 데이터베이스가 없어서 임시로 만든 데이터 변수 (mock)
const mockPosts = [
    { id: 8, title: "첫 번째 택배", content: "무사히 도착했습니다." },
    { id: 3, title: "두 번째 택배", content: "파손 주의해주세요!" },
    { id: 5, title: "세 번째 택배", content: "문 앞에 두고 가주세요." },
];

router.get("/posts", (req, res) => {
  res.json(mockPosts);
})

router.get("/posts/:id", (req, res) => {
  const targetId = Number(req.params.id);

  const result = mockPosts.find((value) => value.id === targetId);
  if (!result) {
    return res.status(404).json({message: "Posts not found."});
  }
  res.json({data: result});
})


export default router; /* router라는 변수(만) 내보내기. mockPosts라는 데이터는 외부에서 알 필요가 없다.*/