import jwt from "jsonwebtoken";

// Middleware to protect routes
export const protect = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({
				success: false,
				message: "No token provided. Authorization denied.",
			});
		}

		const token = authHeader.split(" ")[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.user = { id: decoded.id }; // ✅ Fix: use correct decoded field
		next();
	} catch (error) {
		console.error("authMiddleware error:", error.message);
		res.status(401).json({
			success: false,
			message: "Invalid or expired token. Access denied.",
		});
	}
};
