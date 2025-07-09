import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		if (!username || !email || !password) {
			return res.status(400).json({
				success: false,
				message: "Please provide all required fields.",
			});
		}

		const userExists = await User.findOne({ email });
		if (userExists) {
			return res.status(409).json({
				success: false,
				message: "User already exists with this email.",
			});
		}

		const user = await User.create({ username, email, password });

		res.status(201).json({
			success: true,
			message: "User registered successfully!",
			token: generateToken(user._id),
			user: {
				_id: user._id,
				username: user.username,
				email: user.email,
			},
		});
	} catch (error) {
		console.error("registerUser error:", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: "Please provide both email and password.",
			});
		}

		const user = await User.findOne({ email }).select("+password");
		if (!user || !(await user.matchPassword(password))) {
			return res.status(401).json({
				success: false,
				message: "Invalid email or password.",
			});
		}

		res.status(200).json({
			success: true,
			message: "Login successful!",
			token: generateToken(user._id),
			user: {
				_id: user._id,
				username: user.username,
				email: user.email,
			},
		});
	} catch (error) {
		console.error("loginUser error:", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};
