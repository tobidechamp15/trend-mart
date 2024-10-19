import mongoose from 'mongoose';

let isConnected = false; // Track the connection status

export const connectMongoDB = async () => {
  if (isConnected) {
    ('MongoDB is already connected');
    return true;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Additional options to suppress Mongoose deprecation warnings
    });

    isConnected = true; // Set the connection status to true
     ('MongoDB connection established');
    return true;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    return error;
  }
};
