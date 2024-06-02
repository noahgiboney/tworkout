import mongoose from "mongoose";

const weightEntrySchema = new mongoose.Schema({
  weight: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  weight: {
    type: [weightEntrySchema],
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
    required: false,
  },
  avatarId: {
    type: Number,
    required: false,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
