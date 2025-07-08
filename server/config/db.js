import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		const db_uri = process.env.MONGODB_URI;
		if (!db_uri) throw new Error("MONGODB_URI not found in environment");

		const connect = await mongoose.connect(db_uri);
		console.log(`✅ MongoDB connected: ${connect.connection.name}`);
	} catch (error) {
		console.error(`❌ MongoDB connection error: ${error.message}`);
		throw error;
	}
};
