import { ServerApiVersion } from "mongodb";
import mongoose from "mongoose";

const connectToDatabase = async (databaseName) => {

	const atlasUri = process.env.MONGODB_URI

	try {
		await mongoose.connect(atlasUri);
		console.log("Connected to MongoDB Atlas");
	} catch (err) {
		console.error("Error connecting to MongoDB Atlas:", err);
	}
};

export default connectToDatabase;