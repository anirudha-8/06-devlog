import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const { data } = await API.post("/auth/register", formData);

			localStorage.setItem("token", data.token);
			localStorage.setItem("user", JSON.stringify(data.user));

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
			<h2 className="text-2xl font-bold mb-6 text-center">
				Register on DevLog
			</h2>

			{error && (
				<p className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">
					{error}
				</p>
			)}

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block mb-1 text-sm font-medium">Username</label>
					<input
						type="text"
						name="username"
						value={formData.username}
						required
						onChange={handleChange}
						className="w-full border px-3 py-2 rounded"
						placeholder="Enter your username"
					/>
				</div>

				<div>
					<label className="block mb-1 text-sm font-medium">Email</label>
					<input
						type="email"
						name="email"
						value={formData.email}
						required
						onChange={handleChange}
						className="w-full border px-3 py-2 rounded"
						placeholder="Enter your email"
					/>
				</div>

				<div>
					<label className="block mb-1 text-sm font-medium">Password</label>
					<input
						type="password"
						name="password"
						value={formData.password}
						required
						onChange={handleChange}
						className="w-full border px-3 py-2 rounded"
						placeholder="Enter your password"
					/>
				</div>

				<button
					type="submit"
					disabled={loading}
					className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
				>
					{loading ? "Registering..." : "Register"}
				</button>
			</form>
		</div>
	);
};

export default RegisterPage;
