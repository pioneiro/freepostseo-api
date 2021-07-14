import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    tools: Object,
  },
  { timestamps: true }
);

const userdb = new mongoose.model("user", userSchema);

export default userdb;
