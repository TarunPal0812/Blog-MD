import express from "express";
import { db } from "../DB/db.js";
import { verifyToken } from "../middleware/auth.js"; 
const router = express.Router();

// Follow a user
router.post("/:userId", verifyToken, (req, res) => {
    const followerId = req.user.id; 
    const followedId = req.params.userId;

    const q = "INSERT INTO followers (`followerId`, `followedId`) VALUES (?, ?)";
    db.query(q, [followerId, followedId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("User followed successfully!");
    });
});

// Unfollow a user
router.post("/unfollow/:userId", verifyToken, (req, res) => {
    const followerId = req.user.id; 
    const followedId = req.params.userId;

    const q = "DELETE FROM followers WHERE `followerId` = ? AND `followedId` = ?";
    db.query(q, [followerId, followedId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("User unfollowed successfully!");
    });
});

// Get the follower count for a user
router.get("/:userId/followers", (req, res) => {
    const followedId = req.params.userId;

    const q = "SELECT * FROM followers WHERE `followedId` = ?";
    db.query(q, [followedId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data); 
    });
});

// Check if the current user is following a user
router.get("/:userId", verifyToken, (req, res) => {
    const followerId = req.user.id; 
    const followedId = req.params.userId;

    const q = "SELECT * FROM followers WHERE `followerId` = ? AND `followedId` = ?";
    db.query(q, [followerId, followedId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ isFollowing: data.length > 0 });
    });
});

export default router;
