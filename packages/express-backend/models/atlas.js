import mongoose, { version } from "mongoose";
// import dotenv from "dotenv"
import { ServerApiVersion } from "mongodb";

const connectToDatabase = async (databaseName) => {
  const atlasUri = process.env.MONGODB_URI;
  const options = {
    serverApi: { version: ServerApiVersion.v1 },
  };

  try {
    await mongoose.connect(atlasUri, options);
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("Error connecting to MongoDB Atlas:", err);
  }
};

export default connectToDatabase;
