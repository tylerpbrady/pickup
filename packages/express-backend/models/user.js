import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },

    // password will definitely need to be changed
    // just putting it here now as placeholder

    password: {
      type: String,
      required: true,
      trim: false,
    },
    games: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
      },
    ],
  },
  { collection: "users_list" }
);

// validate(value) {
//   if (value.length < 2)
//     throw new Error("Invalid job, must be at least 2 characters.");
// }

const User = mongoose.model("User", UserSchema);

export default User;
