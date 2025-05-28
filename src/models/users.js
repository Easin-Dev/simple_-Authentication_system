import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      enum: ["google", "facebook", "credentials"],
      default: "credentials",
    },
    image: {
      type: String,
      default: "https://i.ibb.co.com/5XJFV6yV/no-author.png",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.models.UserData ||
  mongoose.model("UserData", userSchema);
