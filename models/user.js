import mongoose, { Schema, models } from 'mongoose';

// Define the User schema
const userSchema = new Schema({
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
});

// Create and export the User model
const User = models.User || mongoose.model('User', userSchema);

export default User;
