import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'e-shop_db',
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.log('Error connecting to MongoDB', error);
    process.exit(1);
  }
};
