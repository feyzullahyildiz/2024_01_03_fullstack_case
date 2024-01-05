import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
export const startTestMongoDb = async () => {
  const mongo = await MongoMemoryServer.create();
  const url = mongo.getUri();
  await mongoose.connect(url);

  return async () => {
    await mongoose.disconnect();
    await mongo.stop();
  };
};
