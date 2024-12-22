import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI || "";
const options = {};

let client: MongoClient;
let db: Db;

if (!process.env.MONGODB_URI) {
  throw new Error(
    "Por favor, define la variable de entorno MONGODB_URI en tu archivo .env.local"
  );
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClient) {
    client = new MongoClient(uri, options);
    global._mongoClient = client;
  } else {
    client = global._mongoClient;
  }

  if (!global._mongoDbInstance) {
    global._mongoDbInstance = client.db("puzzle");
  }
  db = global._mongoDbInstance;
} else {
  client = new MongoClient(uri, options);
  db = client.db("puzzle");
}

export { client };
export default db;
