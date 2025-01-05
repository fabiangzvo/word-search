import { MongoClient } from "mongodb";
import mongoose from "mongoose";

import * as models from "./models";

let cached = global.mongoose;

export async function registerModels(): Promise<void> {
  for (const model of Object.values(models)) {
    if (model) {
      const modelName = model.modelName;

      if (!mongoose.models[modelName]) {
        mongoose.model(modelName, model.schema);
        console.info(`Model registered: ${modelName}`);
      }
    }
  }
}

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

  await registerModels();

  return cached.conn;
}

export async function getClient(): Promise<MongoClient> {
  return await mongooseConnect().then(
    (instance) => instance.connection.getClient() as unknown as MongoClient
  );
}

export default mongooseConnect;
