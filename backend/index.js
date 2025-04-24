
import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import multer from "multer";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";
import userRoute from "./routes/users.js";
import followRoute from "./routes/follow.js";
import commentRoute from "./routes/comments.js";
import likesRoute from "./routes/likes.js";

dotenv.config();
const app = express();

// Rate Limiting Middleware
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(globalLimiter);

// CORS configuration
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true, 
}));

// Body Parser Middleware
app.use(express.json());
app.use(cookieParser());

// File Upload Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage });
app.post('/api/v1/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
});

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/follow", followRoute);
app.use("/api/v1/comments", commentRoute);
app.use("/api/v1/likes", likesRoute);

// Test Route
app.get("/", (req, res) => {
    res.send("Server running successfully!");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
