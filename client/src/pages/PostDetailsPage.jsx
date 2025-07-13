import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";

const PostDetailsPage = () => {
	const { id } = useParams();
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const fetchPost = async () => {
		try {
			const { data } = await API.get(`/posts/${id}`);
			setPost(data.data);
		} catch (err) {
			setError(err?.response?.data?.message || "Post not found.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPost();
	}, [id]);

	if (loading) return <p className="text-gray-600">Loading post...</p>;

	if (error)
		return (
			<div className="text-red-600">
				<p>{error}</p>
				<Link to="/" className="text-blue-600 underline">
					← Go back
				</Link>
			</div>
		);

	return (
		<article className="bg-white p-6 rounded shadow">
			<h1 className="text-3xl font-bold mb-4">{post.title}</h1>
			<p className="text-gray-500 text-sm mb-2">
				Posted by <strong>{post.author}</strong> on{" "}
				{new Date(post.createdAt).toLocaleDateString()}
			</p>
			<div className="mb-4 space-x-2">
				{post.tags.map((tag) => (
					<span
						key={tag}
						className="inline-block bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded"
					>
						#{tag}
					</span>
				))}
			</div>
			<div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
				{post.content}
			</div>

			<Link to="/" className="inline-block mt-6 text-blue-600 hover:underline">
				← Back to all posts
			</Link>
		</article>
	);
};

export default PostDetailsPage;
