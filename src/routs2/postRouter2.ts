import express from "express";

const router = express.Router();

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

    const result = mockPosts.find(value => {
        return value.id === targetId;
    })

    if (!result) {
        return res.status(404).json({message: "Posts not found"})
    }

    res.json({data: result});
})

export default router;