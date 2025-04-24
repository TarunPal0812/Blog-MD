import { db } from "../DB/db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const register = (req, res) => {
    try {

        //Check Existing User
        const q = "SELECT * FROM users WHERE email=? OR username = ?"

        db.query(q, [req.body.email, req.body.username], async (err, data) => {
            if (err) return res.json(err)

            if (data.length) return res.status(409).json("User already exists")

            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            // console.log(hashedPassword);


            const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)"

            const values = [
                req.body.username,
                req.body.email,
                hashedPassword
            ]
            db.query(q, [values], (err, data) => {
                if (err) return res.json(err)

                return res.status(200).json("User has been created..!")
            })
        })

    } catch (error) {
        console.log(error);

    }
}

const login = (req, res) => {
    try {
        //Check User
        const q = "SELECT * FROM users WHERE username = ?"
        db.query(q, [req.body.username], async (err, data) => {
            if (err) return res.json(err)
            if (data.length === 0) return res.status(404).json("User not found!")
            //Check password
            const isPassword = await bcrypt.compare(req.body.password, data[0].password)
            if (!isPassword) return res.status(400).json("Wrong username or password!")

            const token = jwt.sign({ id: data[0].id }, "hijibiji")
            // console.log(token);
            
            const {password,...other} = data[0]
            res.cookie("access-token", token, {
                httpOnly: true, // Cannot be accessed by JavaScript
                secure: false,
                sameSite: "strict", // Strict cookie policy for CSRF protection
                maxAge: 3600 * 1000, // Set cookie expiration (1 hour here)
            }).status(200).json(other)
        })
    } catch (error) {
        console.log(error);

    }
}

const logout = (req, res) => {
    try {
        res.clearCookie("access-token", {
            httpOnly: true,
            sameSite: "strict",
            secure: false // Set to true in production with HTTPS
        });
        return res.status(200).json("User successfully logged out");
    } catch (error) {
        console.log("Logout error:", error);
        return res.status(500).json("Logout failed");
    }
};



export {
    register,
    login,
    logout
}