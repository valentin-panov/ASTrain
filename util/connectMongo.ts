import mongoose from "mongoose";

const connectMongo = async () =>
  mongoose.connect(process.env.ATLAS_URL as string);

export default connectMongo;
