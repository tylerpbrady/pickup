import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

// creates a user
function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

// retrieves a user by name
function getUser(name) {
  return userModel.find({ username: name });
}

// updates user profile
function updateUser(name, profile) {
  // parse profile into JSON.
  return userModel.updateOne({name: name}, profile)
}


export default {
  addUser,
  updateUser,
  getUser
};
