import { db } from "../DB/db.js";
import jwt from "jsonwebtoken";

// Get total likes + whether user liked the post
export const getLikes = (req, res) => {
  const postId = req.params.postId;
  const userId = req.query.userId;

  const totalLikesQuery = "SELECT COUNT(*) AS totalLikes FROM likes WHERE post_id = ?";
  const userLikedQuery = "SELECT * FROM likes WHERE post_id = ? AND user_id = ?";

  db.query(totalLikesQuery, [postId], (err, totalResult) => {
    if (err) return res.status(500).json(err);

    db.query(userLikedQuery, [postId, userId], (err2, likedResult) => {
      if (err2) return res.status(500).json(err2);

      return res.status(200).json({
        totalLikes: totalResult[0].totalLikes,
        userLiked: likedResult.length > 0
      });
    });
  });
};

// Like / Unlike toggle
export const toggleLike = (req, res) => {
  const token = req.cookies["access-token"];
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "hijibiji", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const userId = userInfo.id;
    const postId = req.params.postId;

    const checkQuery = "SELECT * FROM likes WHERE user_id = ? AND post_id = ?";
    db.query(checkQuery, [userId, postId], (err, data) => {
      if (err) return res.status(500).json(err);

      if (data.length > 0) {
        // Unlike
        const deleteQuery = "DELETE FROM likes WHERE user_id = ? AND post_id = ?";
        db.query(deleteQuery, [userId, postId], (err) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json("Unliked post.");
        });
      } else {
        // Like
        const insertQuery = "INSERT INTO likes (user_id, post_id) VALUES (?, ?)";
        db.query(insertQuery, [userId, postId], (err) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json("Liked post.");
        });
      }
    });
  });
};
