import express from "express";

import {
	getAllPosts,
	createPost,
	getPostById,
	deletePost,
	updatePost,
	filterPostByTags,
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

// update post route
router.put("/:id", updatePost);

// filter posts by tags route
router.get("/tag/:tag", filterPostByTags);

export default router;
