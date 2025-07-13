import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	// Get user from localStorage
	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		setUser(storedUser ? JSON.parse(storedUser) : null);
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setUser(null);
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
