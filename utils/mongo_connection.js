import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);

    return connection; // Return the connection for debugging or further usage
  } catch (err) {
    throw new Error("Failed to connect to the database");
  }
};
