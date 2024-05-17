import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  weight: {
    type: number,
    required: false
  },
  height: {
    type: number, 
    required: false
  }
});

// Create a model from the schema
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;