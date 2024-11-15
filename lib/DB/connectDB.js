import mongoose from "mongoose";
export default async function connectDB() {
  try {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(
      "mongodb+srv://mmrabbi625442:mongo123@cluster0.lpqnnvm.mongodb.net/shopingCartDB"
    );
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
}
