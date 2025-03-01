import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://minhazulabedin75:kZVhF9hUDndrY8uH@cluster0.qjke1.mongodb.net/property";
 

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment"
  );
}


let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
