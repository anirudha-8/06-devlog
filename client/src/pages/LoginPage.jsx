import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const { data } = await API.post("/auth/login", { email, password });

			// Save token to localStorage
			localStorage.setItem("token", data.token);
			localStorage.setItem("user", JSON.stringify(data.user));

			// Navigate to home
			navigate("/");
		} catch (err) {
			setError(
				err?.response?.data?.message ||
					"Something went wrong. Please try again."
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
					className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
				>
					{loading ? "Logging in..." : "Login"}
				</button>
			</form>
		</div>
	);
};

export default LoginPage;
