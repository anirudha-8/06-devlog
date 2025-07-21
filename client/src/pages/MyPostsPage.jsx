import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../hooks/useAuth";

const MyPostsPage = () => {
	const { user } = useAuth();
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		if (!user) return;
		fetchMyPosts();
	}, [user]);

	const fetchMyPosts = async () => {
		try {
			const { data } = await API.get("/posts");
			// Filter posts by current user
			const myPosts = data.data.filter(
				(post) => post.author._id === user._id
			);
			setPosts(myPosts);
		} catch (err) {
			setError(err?.response?.data?.message || "Failed to fetch posts");
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (postId) => {
		if (!confirm("Are you sure you want to delete this post?")) return;

		try {
			await API.delete(`/posts/${postId}`);
			setPosts((prev) => prev.filter((post) => post._id !== postId));
		} catch (err) {
			alert(
				err?.response?.data?.message || "Failed to delete post"
			);
		}
	};

	if (loading)
		return <p className="text-gray-600 text-center py-8">Loading your posts...</p>;

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">📚 My Posts</h1>
				<Link
					to="/create-post"
					className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
				>
					+ New Post
				</Link>
			</div>

			{error && (
				<p className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">
					{error}
				</p>
			)}

			{posts.length === 0 ? (
				<div className="bg-white p-6 rounded shadow text-center">
					<p className="text-gray-600 mb-4">
						You haven't written any posts yet.
					</p>
					<Link
						to="/create-post"
						className="text-blue-600 hover:underline font-semibold"
					>
						Write your first post →
					</Link>
				</div>
			) : (
				<div className="grid gap-6">
					{posts.map((post) => (
						<div key={post._id} className="bg-white p-6 rounded shadow">
							<div className="flex justify-between items-start">
								<div className="flex-1">
									<h2 className="text-xl font-semibold mb-2">
										{post.title}
									</h2>
									<p className="text-gray-700 mb-3 line-clamp-2">
										{post.content.slice(0, 150)}...
									</p>
									<div className="text-sm text-gray-500 mb-2">
										Posted on{" "}
										{new Date(post.createdAt).toLocaleDateString()}
									</div>
									<div className="space-x-2">
										{post.tags.map((tag) => (
											<span
												key={tag}
												className="inline-block bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded"
											>
												#{tag}
											</span>
										))}
									</div>
								</div>
								<div className="flex gap-2 ml-4">
									<Link
										to={`/posts/${post._id}`}
										className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 text-sm"
									>
										View
									</Link>
									<Link
										to={`/edit-post/${post._id}`}
										className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 text-sm"
									>
										Edit
									</Link>
									<button
										onClick={() => handleDelete(post._id)}
										className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 text-sm"
									>
										Delete
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default MyPostsPage;
