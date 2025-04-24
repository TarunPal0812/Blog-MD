import express from "express";
import { getLikes, toggleLike } from "../controllers/Likes.js";

const router = express.Router();

router.get("/:postId", getLikes);       // GET /likes/:postId?userId=xxx
router.post("/:postId", toggleLike);    // POST /likes/:postId

export default router;
