import mongoose, { Schema, model } from 'mongoose';

// Define the User schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true, // Ensures that the name field is required
    },
    userName: {
      type: String,
      required: true, // Ensures that the name field is required
    },
    email: {
      type: String,
      required: true, // Ensures that the email field is required
      unique: true, // Ensures that the email is unique
    },
    password: {
      type: String,
      required: true, // Ensures that the email field is required
    },
  },
  {
    timestamps: true,
  },
);

// Create and export the User model
const User = model('User', userSchema);

export default User;
