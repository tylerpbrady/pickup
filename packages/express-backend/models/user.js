import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: false,
      trim: true,
    },
    password: {
      type: String,
      required: false,
      trim: false,
    },
    name: {
      type: String,
      required: false,
      trim: false,
    },
    sports_of_interest: {
      type: String,
      required: false,
      trim: false,
    },
    city: {
      type: String,
      required: false,
      trim: false,
    }
  },
  { collection: "users_list" },
);

const User = mongoose.model("User", UserSchema);

export default User;
