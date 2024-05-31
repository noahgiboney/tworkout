import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: false,
  },
  heightFeet: {
    type: Number,
    required: false,
  },

  heightInches: {
    type: Number,
    required: false,
  },

  age: {
    type: Number,
    require: false,
  },

  avatarId: {
    type: Number,
    require: false,
  },
});

// Create a model from the schema
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
