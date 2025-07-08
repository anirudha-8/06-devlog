import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		content: {
			type: String,
			required: true,
			trim: true,
		},
		author: {
			type: String,
			required: true,
			trim: true,
		},
		tags: {
			type: [String],
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

const Post = mongoose.model("Post", postSchema);
export default Post;
