import express from "express";
import {
	getAllPosts,
	createPost,
	getPostById,
	deletePost,
	updatePost,
	filterPostByTags,
} from "../controllers/postController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllPosts);
router.get("/tag/:tag", filterPostByTags); // ✅ Moved above /:id to avoid route conflict
router.get("/:id", getPostById);

// Protected routes
router.post("/", protect, createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

export default router;
