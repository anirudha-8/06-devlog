import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
	const navigate = useNavigate();
	const { user, logout } = useAuth();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<header className="bg-white shadow">
			<nav className="container mx-auto px-4 py-4 flex justify-between items-center">
				<Link to="/" className="text-xl font-bold text-blue-600">
					DevLog 📝
				</Link>

				<div className="flex items-center gap-4">
					{user ? (
						<>
							<span className="text-gray-700">Welcome, {user.username}!</span>
							<Link
								to="/create-post"
								className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
							>
								+ New Post
							</Link>
							<Link
								to="/my-posts"
								className="text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-100"
							>
								My Posts
							</Link>
							<button
								onClick={handleLogout}
								className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
							>
								Logout
							</button>
						</>
					) : (
						<>
							<Link
								to="/login"
								className="text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-100"
							>
								Login
							</Link>
							<Link
								to="/register"
								className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
							>
								Register
							</Link>
						</>
					)}
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
