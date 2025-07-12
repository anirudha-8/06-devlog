import { useState } from "react";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		// TODO: Add login logic here
		console.log("Login form submitted:", { email, password });
	};

	return (
		<div className="max-w-md mx-auto bg-white p-8 shadow-md rounded">
			<h2 className="text-2xl font-bold mb-6 text-center">Login to DevLog</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block mb-1 text-sm font-medium text-gray-700">
						Email
					</label>
					<input
						type="email"
						className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
						className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter your password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>

				<button
					type="submit"
					className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition"
				>
					Login
				</button>
			</form>
		</div>
	);
};

export default LoginPage;
