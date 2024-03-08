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
    }
  },
  { collection: "users_list" },
);

// validate(value) {
//   if (value.length < 2)
//     throw new Error("Invalid job, must be at least 2 characters.");
// }

const User = mongoose.model("User", UserSchema);

export default User;
