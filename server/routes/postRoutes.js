import express from "express";

import {
	getAllPosts,
	createPost,
	getPostById,
	deletePost,
} from "../controllers/postController.js";

const router = express.Router();

// get post route
router.get("/", getAllPosts);

// get single post by id route
router.get("/:id", getPostById);

// create post route
router.post("/", createPost);

// delete post route
router.delete("/:id", deletePost);

export default router;
