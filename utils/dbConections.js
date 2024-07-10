import mongoose from "mongoose"
import path from "node:path"

let credentials = ""
if (process.env.NODE_ENV === 'development') {
  credentials = path.join(import.meta.dirname, "..", "credentials", process.env.CREDENTIAL_FILE);
  console.log("development")
}

if (process.env.NODE_ENV === 'production') {
  credentials = path.join("/etc", "secrets", process.env.CREDENTIAL_FILE);
}
const clientOptions = {
  tlsCertificateKeyFile: credentials,
  serverApi: { version: '1', strict: true, deprecationErrors: true }
};

export const connectToDB = async () => {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(process.env.MONGO_URI, clientOptions);
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}
