import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

const HomePage = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchPosts = async () => {
		try {
			const { data } = await API.get("/posts");
			setPosts(data.data || []);
		} catch (error) {
			console.error("Error fetching posts:", error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<div>
			<h1 className="text-3xl font-bold mb-6">📝 Latest DevLog Posts</h1>

			{loading ? (
				<p className="text-gray-600">Loading posts...</p>
			) : posts.length === 0 ? (
				<p className="text-gray-600">
					No posts available. Be the first to write one!
				</p>
			) : (
				<div className="grid gap-6">
					{posts.map((post) => (
						<div key={post._id} className="bg-white p-6 rounded shadow">
							<h2 className="text-xl font-semibold mb-2">{post.title}</h2>
							<p className="text-gray-700 mb-3 line-clamp-3">
								{post.content.slice(0, 200)}...
							</p>
							<div className="text-sm text-gray-500">
								Posted by{" "}
								<strong>{post.author?.username || "Unknown Author"}</strong> on{" "}
								{new Date(post.createdAt).toLocaleDateString()}
							</div>
							<Link
								to={`/posts/${post._id}`}
								className="inline-block mt-3 text-blue-600 hover:underline"
							>
								Read More →
							</Link>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default HomePage;
