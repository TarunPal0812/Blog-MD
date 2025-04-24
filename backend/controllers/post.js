// import { db } from "../DB/db.js"
// import jwt from "jsonwebtoken"

// export const getPosts = (req,res)=>{
//     const q = req.query.cat ? "SELECT * FROM posts WHERE cat=?":"SELECT * FROM posts"
//     db.query(q, [req.query.cat],(err,data)=>{
//         if (err) return res.status(500).json(err)

//         return res.status(200).json(data)
//     })
// }
// export const getSinglePost = (req, res) => {
//     const q = "SELECT p.id ,`username`,`title`,`desc`,p.img,u.img AS userImg,`cat`,`date` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id=?"
//     db.query(q, [req.params.id], (err, data) => {
//         if (err) return res.status(500).json(err)

//         return res.status(200).json(data[0])
//     })
// }
// export const addPost = (req, res) => {

//     const token = req.cookies["access-token"];


//     // console.log(token);


//     if (!token) return res.status(401).json("Not authenticated")
//     jwt.verify(token, "hijibiji", (err, userInfo) => {
//         if (err) return res.status(403).json("Token is not valid!")
            
//             const q = "INSERT INTO posts(`title`,`desc`,`img`,`cat`,`date`,`uid`) VALUES (?)"

//             const values =[
//                 req.body.title,
//                 req.body.desc,
//                 req.body.img,
//                 req.body.cat,
//                 req.body.date,
//                 userInfo.id
//             ]
//             db.query(q,[values],(err,data)=>{
//                 if (err) return res.status(500).json(err)
//              return res.status(200).json("Post has been created!")       
//             })
//         })
//     }
// export const deletePost = (req, res) => {
//     const token = req.cookies["access-token"];


//     // console.log(token);
    

//     if(!token) return res.status(401).json("Not authenticated")
//      jwt.verify(token,"hijibiji",(err,userInfo)=>{
//         if(err) return res.status(403).json("Token is not valid!")
//             const postId = req.params.id
//         const q = "DELETE FROM posts WHERE `id`=? AND `uid`=?"

//         db.query(q,[postId,userInfo.id],(err,data)=>{
//             if (err) return res.status(403).json("You can delete only yyour own post!")

//             return res.status(200).json("Post has been deleted!")
//         })
        
// })


// }
// export const updatePost = (req, res) => {
//     const token = req.cookies["access-token"];


//     // console.log(token);


//     if (!token) return res.status(401).json("Not authenticated")
//     jwt.verify(token, "hijibiji", (err, userInfo) => {
//         if (err) return res.status(403).json("Token is not valid!")

//             const postId = req.params.id
//         const q = "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id`=? AND `uid`=?"

//         const values = [
//             req.body.title,
//             req.body.desc,
//             req.body.img,
//             req.body.cat,
           
//         ]
//         db.query(q, [...values,postId,userInfo.id], (err, data) => {
//             if (err) return res.status(500).json(err)
//             return res.status(200).json("Post has been updated!")
//         })
//     })
// }

import { db } from "../DB/db.js"
import jwt from "jsonwebtoken"

// --- Get All Posts ---
export const getPosts = (req, res) => {
    
    
    const q = req.query.cat ? "SELECT * FROM posts WHERE cat=?" : "SELECT * FROM posts"
    db.query(q, [req.query.cat], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}

// --- Get Single Post ---
export const getSinglePost = (req, res) => {
    
    const q = "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg,p.uid AS userId, `cat`, `date` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id=?"
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err)
            // console.log(data[0]);
            
        return res.status(200).json(data[0])
    })
}

// --- Add Post ---
export const addPost = (req, res) => {
    
    const token = req.cookies["access-token"]
    if (!token) return res.status(401).json("Not authenticated")

    jwt.verify(token, "hijibiji", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const q = "INSERT INTO posts(`title`,`desc`,`img`,`cat`,`date`,`uid`) VALUES (?)"
        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
            req.body.date,
            userInfo.id
        ]
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json("Post has been created!")
        })
    })
}

// --- Delete Post ---
export const deletePost = (req, res) => {
    const token = req.cookies["access-token"]
    if (!token) return res.status(401).json("Not authenticated")

    jwt.verify(token, "hijibiji", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const postId = req.params.id
        const q = "DELETE FROM posts WHERE `id`=? AND `uid`=?"
        db.query(q, [postId, userInfo.id], (err, data) => {
            if (err) return res.status(403).json("You can delete only your own post!")
            return res.status(200).json("Post has been deleted!")
        })
    })
}

// --- Update Post ---
export const updatePost = (req, res) => {
   
    const token = req.cookies["access-token"]
    if (!token) return res.status(401).json("Not authenticated")

    jwt.verify(token, "hijibiji", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const postId = req.params.id
        const q = "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id`=? AND `uid`=?"
        const values = [
            req.body.title,
            req.body.desc,
            req.body?.img,
            req.body.cat,
        ]
        db.query(q, [...values, postId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json("Post has been updated!")
        })
    })
}

// --- Follow User ---
export const followUser = (req, res) => {
    const token = req.cookies["access-token"]
    if (!token) return res.status(401).json("Not authenticated")

    jwt.verify(token, "hijibiji", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const followerId = userInfo.id
        const followedId = req.params.userId

        const q = "SELECT * FROM follows WHERE follower_id = ? AND followed_id = ?"
        db.query(q, [followerId, followedId], (err, data) => {
            if (err) return res.status(500).json(err)

            if (data.length > 0) {
                return res.status(400).json("You already follow this user!")
            }

            const insertQuery = "INSERT INTO follows (`follower_id`, `followed_id`) VALUES (?, ?)"
            db.query(insertQuery, [followerId, followedId], (err, result) => {
                if (err) return res.status(500).json(err)
                return res.status(200).json("You are now following this user!")
            })
        })
    })
}

// --- Unfollow User ---
export const unfollowUser = (req, res) => {
    const token = req.cookies["access-token"]
    if (!token) return res.status(401).json("Not authenticated")

    jwt.verify(token, "hijibiji", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const followerId = userInfo.id
        const followedId = req.params.userId

        const q = "DELETE FROM follows WHERE follower_id = ? AND followed_id = ?"
        db.query(q, [followerId, followedId], (err, data) => {
            if (err) return res.status(500).json(err)

            return res.status(200).json("You have unfollowed this user!")
        })
    })
}

// --- Get Followers Count ---
export const getFollowersCount = (req, res) => {
    const q = "SELECT COUNT(*) AS followerCount FROM follows WHERE followed_id = ?"
    db.query(q, [req.params.userId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data[0])
    })
}

// --- Add Comment ---
export const addComment = (req, res) => {
    const token = req.cookies["access-token"]
    if (!token) return res.status(401).json("Not authenticated")

    jwt.verify(token, "hijibiji", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const q = "INSERT INTO comments (`content`, `post_id`, `user_id`) VALUES (?)"
        const values = [
            req.body.content,
            req.body.postId,
            userInfo.id
        ]
        db.query(q, [values], (err, result) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json("Comment added successfully!")
        })
    })
}
