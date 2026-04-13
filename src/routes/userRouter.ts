import express from "express";
import path from "path";

const router = express.Router();

const mockUsers = [
    {id : 1, email: "admin@test.com", password: "password123", name: "관리자"},
    {id : 2, email: "user@test.com", password: "1234", name: "일반유저"}
];

router.get("/users/login", (req, res) => {
    const {email, password} = req.query;
    const successPage = path.join(process.cwd(), "public", "success.html");
    const failPage = path.join(process.cwd(), "public", "fail.html");

    if (!email || !password) {
      return res.sendFile(failPage);
    }
    const user = mockUsers.find(user => user.email === email);
    if (!user) {
      return res.sendFile(failPage);
    }
    if (user.password !== password) {
        return res.sendFile(failPage);
    }
    res.sendFile(successPage);
});


export default router;