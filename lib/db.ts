import mongoose, { Mongoose } from "mongoose";

export async function dbConnect(): Promise<Mongoose> {
  const conString = process.env.MONGO_URL as string;

  if (!conString) {
    throw new Error("MONGO_URL is not defined in environment variables");
  }

  try {
    const connection = await mongoose.connect(conString, {
      autoIndex: true,
    });
    console.log("Database connected");
    return connection;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Database connection failed");
  }
}

export const disconnect = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log("Database disconnected");
  } catch (error) {
    console.error("Error disconnecting from the database:", error);
  }
};
