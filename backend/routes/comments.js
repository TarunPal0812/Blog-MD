import express from "express"
import { db } from "../DB/db.js"
import { verifyToken } from "../middleware/auth.js" 
const router = express.Router()

// Add a comment to a post
router.post("/", verifyToken, (req, res) => {
    const { content, postId } = req.body;
    const userId = req.user.id; 

    const q = "INSERT INTO comments (`content`, `postId`, `userId`, `date`) VALUES (?, ?, ?, NOW())"
    db.query(q, [content, postId, userId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json("Comment added successfully!")
    })
})

// Get comments for a post
router.get("/:postId", (req, res) => {
    const postId = req.params.postId;

    const q = "SELECT c.*, u.username, u.img AS userImg FROM comments c JOIN users u ON c.userId = u.id WHERE c.postId = ? ORDER BY c.date DESC"
    db.query(q, [postId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
})

export default router
