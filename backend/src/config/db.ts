import mongoose, { ConnectOptions } from "mongoose";

// mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    );
    console.log("Database is connected");
  } catch (error: any) {
    console.log(error.message);
  }
};

export default connectDB;
