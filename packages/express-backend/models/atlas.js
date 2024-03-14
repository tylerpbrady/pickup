import mongoose from "mongoose";
import dotenv from "dotenv"
import { ServerApiVersion } from "mongodb";

// this function serves to connect to the MongoDB Atlas backend where our database is located
const connectToDatabase = async () => {
  dotenv.config()
  // info required for the connection
  const atlasUri = process.env.MONGODB_URI;
  const options = {
    serverApi: { version: ServerApiVersion.v1 },
  };

  try {
    // attempt to connect with a mongoose connection
    await mongoose.connect(atlasUri, options);
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("Error connecting to MongoDB Atlas:", err);
  }
};

export default connectToDatabase;
