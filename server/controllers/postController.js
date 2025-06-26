import Post from "../models/Post.js";

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
export const getAllPosts = async (req, res) => {
	try {
		const posts = await Post.find().sort({ createdAt: -1 });

		if (posts.length === 0) {
			return res.status(404).json({
				success: false,
				message: "No posts found!",
			});
		}

		res.status(200).json({
			success: true,
			message: "All posts fetched successfully!",
			data: posts,
		});
	} catch (error) {
		console.error("getAllPosts error:", error);
		res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};

// @desc    Create a new post
// @route   POST /api/posts
// @access  Public
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
			message: "Post created successfully!",
			data: newPost,
		});
	} catch (error) {
		console.error("createPost error:", error);
		res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};
