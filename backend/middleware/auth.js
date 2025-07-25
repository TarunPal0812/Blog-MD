import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const token = req.cookies["access-token"]

    if (!token) return res.status(401).json("Not authenticated")

    jwt.verify(token, "hijibiji", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")
        req.user = userInfo
        next()
    })
}
