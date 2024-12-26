import { MongoClient } from "mongodb";
import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function mongooseConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  cached.promise = mongoose.connect(process.env.MONGODB_URI);

  cached.conn = await cached.promise;

  return cached.conn;
}

export async function getClient(): Promise<MongoClient> {
  return await mongooseConnect().then(
    (instance) => instance.connection.getClient() as unknown as MongoClient
  );
}

export default mongooseConnect;
