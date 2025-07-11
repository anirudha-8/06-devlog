import Post from "../models/Post.js";
import mongoose from "mongoose";

// Helper to sanitize regex input
const escapeRegExp = (text) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

// @desc    Get all posts with optional search & pagination
export const getAllPosts = async (req, res) => {
	try {
		const { search = "", page = 1, limit = 10 } = req.query;

		const MAX_LIMIT = 100;
		const currentPage = Math.max(parseInt(page), 1);
		const perPage = Math.min(Math.max(parseInt(limit), 1), MAX_LIMIT);
		const skip = (currentPage - 1) * perPage;

		const safeSearch = escapeRegExp(search.trim());

		const query = safeSearch
			? {
					$or: [
						{ title: { $regex: safeSearch, $options: "i" } },
						{ tags: { $regex: safeSearch, $options: "i" } },
					],
			  }
			: {};

		const total = await Post.countDocuments(query);
		const posts = await Post.find(query)
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(perPage);

		res.status(200).json({
			success: true,
			message: posts.length
				? "Posts fetched successfully!"
				: "No matching posts found.",
			data: posts,
			pagination: {
				total,
				page: currentPage,
				pages: Math.ceil(total / perPage),
				limit: perPage,
			},
		});
	} catch (error) {
		console.error("getAllPosts error:", error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};

export const getPostById = async (req, res) => {
	try {
		const { id } = req.params;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res
				.status(400)
				.json({ success: false, message: "Invalid post ID" });
		}

		const post = await Post.findById(id);
		if (!post) {
			return res
				.status(404)
				.json({ success: false, message: "Post not found" });
		}

		res.status(200).json({ success: true, data: post });
	} catch (error) {
		console.error("getPostById error:", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};

export const createPost = async (req, res) => {
	try {
		const { title, content, author, tags = [] } = req.body;

		if (!title || !content || !author) {
			return res.status(400).json({
				success: false,
				message: "Please provide title, content, and author",
			});
		}

		const newPost = await Post.create({ title, content, author, tags });

		res.status(201).json({
			success: true,
			message: "Post created successfully",
			data: newPost,
		});
	} catch (error) {
		console.error("createPost error:", error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};

export const deletePost = async (req, res) => {
	try {
		const { id } = req.params;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res
				.status(400)
				.json({ success: false, message: "Invalid post ID" });
		}

		const deletedPost = await Post.findByIdAndDelete(id);
		if (!deletedPost) {
			return res
				.status(404)
				.json({ success: false, message: "Post not found" });
		}

		res.status(200).json({
			success: true,
			message: "Post deleted successfully",
			data: deletedPost,
		});
	} catch (error) {
		console.error("deletePost error:", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};

export const updatePost = async (req, res) => {
	try {
		const { id } = req.params;
		const { title, content, author, tags } = req.body;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res
				.status(400)
				.json({ success: false, message: "Invalid post ID" });
		}

		if (!title && !content && !author && !tags) {
			return res.status(400).json({
				success: false,
				message: "Please provide at least one field to update",
			});
		}

		const updatedPost = await Post.findByIdAndUpdate(
			id,
			{ title, content, author, tags },
			{ new: true, runValidators: true }
		);

		if (!updatedPost) {
			return res
				.status(404)
				.json({ success: false, message: "Post not found" });
		}

		res.status(200).json({
			success: true,
			message: "Post updated successfully",
			data: updatedPost,
		});
	} catch (error) {
		console.error("updatePost error:", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};

export const filterPostByTags = async (req, res) => {
	try {
		const { tag } = req.params;
		const trimmedTag = tag?.trim();

		const posts = await Post.find({
			tags: { $regex: new RegExp(`^${trimmedTag}$`, "i") },
		}).sort({ createdAt: -1 });

		if (!posts.length) {
			return res.status(404).json({
				success: false,
				message: `No posts found with the tag: ${tag}`,
			});
		}

		res.status(200).json({
			success: true,
			message: `Found ${posts.length} post(s) with the tag: ${tag}`,
			data: posts,
		});
	} catch (error) {
		console.error("filterPostByTags error:", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};
