import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

/* mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error)); */

function getUsers(name) {
  let promise;
  //   if (name === undefined && job === undefined) {
  promise = userModel.find();
  //   } else if (name && !job) {
  // promise = findUserByName(name);
  //   } else if (job && !name) {
  // promise = findUserByJob(job);
  //   } else {
  // promise = findUserByNameAndJob(name, job);
  //   }
  return promise;
}

// function findUserById(id) {
//   return userModel.findById(id);
// }

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

// function deleteUserById(id) {
//     return userModel.findByIdAndDelete(id);
// }

function getUser(name) {
  return userModel.find({ username: name });
}

// function findUserByJob(job) {
//   return userModel.find({ job: job });
// }

// function findUserByNameAndJob(name, job) {
//     return userModel.find({ name: name, job: job });
// }

export default {
  addUser,
  getUsers,
  //   findUserById,
  getUser,
  //   findUserByJob,
  //   findUserByNameAndJob,
  //   deleteUserById
};
