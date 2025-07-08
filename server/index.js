import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import postRoutes from "./routes/postRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
	res.send("Welcome to DevLog API. Visit /api for all endpoints.");
});

app.get("/api", (req, res) => {
	res.json({ message: "API is working! 🚀" });
});

app.get("/api/status", (req, res) => {
	res.send("Server is healthy ✅");
});

// API routes
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

// Connect DB and then start server
connectDB()
	.then(() => {
		app.listen(port, () => {
			console.log(`🚀 Server is running at http://localhost:${port}`);
		});
	})
	.catch((err) => {
		console.error("❌ Failed to start server due to DB error:", err);
	});
