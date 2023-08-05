import mongoose from "mongoose"


let cachedClient: typeof mongoose | undefined = undefined;

const dbConnect = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }
  if (cachedClient === undefined) {
    console.log("using MongoDB cache connection")
    return
  }
  const uri = process.env.MONGODB_URI;
  cachedClient = await mongoose.connect(uri);
  console.log("MongoDB connected")

};

export default dbConnect;



