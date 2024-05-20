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
    type: Number,
    required: false
  },
  height: {
    type: Number, 
    required: false
  }
});

// Create a model from the schema
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;