import { ServerApiVersion } from "mongodb";
import mongoose from "mongoose";

const connectToDatabase = async (databaseName) => {
    const credentials = "./X509-cert-1627384780018471820.pem";

    const options = {
        tlsCertificateKeyFile: credentials,
        serverApi: { version: ServerApiVersion.v1 },
    };

    const atlasUri = `mongodb+srv://cluster0.ovyhplb.mongodb.net/${databaseName}?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority&appName=Cluster0`;

    try {
        await mongoose.connect(atlasUri, options);
        console.log("Connected to MongoDB Atlas");
    } catch (err) {
        console.error("Error connecting to MongoDB Atlas:", err);
    }
};

export default connectToDatabase;
