import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { login } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const { data } = await API.post("/auth/login", { email, password });

			// Use AuthContext to login
			login(data.token, data.user);

			// Navigate to home
			navigate("/");
		} catch (err) {
			setError(
				err?.response?.data?.message ||
					"Something went wrong. Please try again.",
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-md mx-auto bg-white p-8 shadow-md rounded">
			<h2 className="text-2xl font-bold mb-6 text-center">Login to DevLog</h2>

			{error && (
				<p className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">
					{error}
				</p>
			)}

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block mb-1 text-sm font-medium text-gray-700">
						Email
					</label>
					<input
						type="email"
						className="w-full border px-3 py-2 rounded"
						placeholder="Enter your email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>

				<div>
					<label className="block mb-1 text-sm font-medium text-gray-700">
						Password
					</label>
					<input
						type="password"
						className="w-full border px-3 py-2 rounded"
						placeholder="Enter your password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>

				<button
					type="submit"
					disabled={loading}
					className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
				>
					{loading ? "Logging in..." : "Login"}
				</button>
			</form>

			<p className="text-center text-gray-600 mt-4">
				Don't have an account?{" "}
				<Link to="/register" className="text-blue-600 hover:underline">
					Register here
				</Link>
			</p>
		</div>
	);
};

export default LoginPage;
