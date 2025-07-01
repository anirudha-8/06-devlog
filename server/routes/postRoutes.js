import express from "express";
import {
	getAllPosts,
	createPost,
	getPostById,
	deletePost,
	updatePost,
	filterPostByTags,
} from "../controllers/postController.js";
import { protect } from "../middlewares/authMiddleware.js"; // ✅ Import the middleware

const router = express.Router();

// Public routes
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.get("/tag/:tag", filterPostByTags);

// Protected routes
router.post("/", protect, createPost); // ✅ Only logged-in users can create
router.put("/:id", protect, updatePost); // ✅ Only logged-in users can update
router.delete("/:id", protect, deletePost); // ✅ Only logged-in users can delete

export default router;
