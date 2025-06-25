import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		const db_uri = process.env.MONGODB_URI;
		const connect = await mongoose.connect(db_uri);
		if (!connect) console.log(`Failed to connect MongoDB database`);
		else console.log(`Successfully connected to MongoDB`);
	} catch (error) {
		console.error(`Unable to connect to MongoDB: ${error.message}`);
		throw error;
	}
};
