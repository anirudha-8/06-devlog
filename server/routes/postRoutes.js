import express from "express";

import { getAllPosts, createPost } from "../controllers/postController.js";

const router = express.Router();

// get post route
router.get("/", getAllPosts);

// create post route
router.post("/", createPost);

export default router;
