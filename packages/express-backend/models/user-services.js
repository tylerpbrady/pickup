import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function getUser(name) {
  return userModel.find({ username: name });
}

function updateUser(name, profile) {
  // parse profile into JSON.
  return userModel.updateOne({name: name}, profile)
}


export default {
  addUser,
  updateUser,
  getUser
};
