// import express from "express"
// import { addPost, deletePost, getPosts, getSinglePost, updatePost } from "../controllers/post.js"

// const router = express.Router()

// router.get("/",getPosts)
// router.get("/:id",getSinglePost)
// router.post("/",addPost)
// router.put("/:id",updatePost)
// router.delete("/:id",deletePost)

// export default router

import express from "express"
import { addPost, deletePost, getPosts, getSinglePost, updatePost} from "../controllers/post.js"

const router = express.Router()

// Post routes
router.get("/", getPosts)
router.get("/:id", getSinglePost)
router.post("/", addPost)
router.put("/:id", updatePost)
router.delete("/:id", deletePost)



export default router
