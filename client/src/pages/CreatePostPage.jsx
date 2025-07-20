import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const CreatePostPage = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		title: "",
		content: "",
		tags: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const tags = formData.tags
				.split(",")
				.map((tag) => tag.trim())
				.filter((tag) => tag);

			const { data } = await API.post("/posts", {
				title: formData.title,
				content: formData.content,
				tags,
			});

			navigate(`/posts/${data.data._id}`);
		} catch (err) {
			setError(
				err?.response?.data?.message ||
					"Failed to create post. Please try again.",
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-2xl mx-auto bg-white p-8 shadow-md rounded">
			<h2 className="text-2xl font-bold mb-6">✍️ Create New Post</h2>

			{error && (
				<p className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">
					{error}
				</p>
			)}

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block mb-1 text-sm font-medium text-gray-700">
						Post Title *
					</label>
					<input
						type="text"
						name="title"
						value={formData.title}
						onChange={handleChange}
						required
						className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
						placeholder="Enter post title"
					/>
				</div>

				<div>
					<label className="block mb-1 text-sm font-medium text-gray-700">
						Content *
					</label>
					<textarea
						name="content"
						value={formData.content}
						onChange={handleChange}
						required
						rows="10"
						className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
						placeholder="Write your post content here..."
					/>
				</div>

				<div>
					<label className="block mb-1 text-sm font-medium text-gray-700">
						Tags (comma-separated)
					</label>
					<input
						type="text"
						name="tags"
						value={formData.tags}
						onChange={handleChange}
						className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
						placeholder="e.g., javascript, react, web-development"
					/>
					<p className="text-xs text-gray-500 mt-1">
						Separate multiple tags with commas
					</p>
				</div>

				<div className="flex gap-3">
					<button
						type="submit"
						disabled={loading}
						className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
					>
						{loading ? "Publishing..." : "Publish Post"}
					</button>
					<button
						type="button"
						onClick={() => navigate(-1)}
						className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500 transition"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreatePostPage;
