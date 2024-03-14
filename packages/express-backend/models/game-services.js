import mongoose from "mongoose";
import gameModel from "./game.js";

mongoose.set("debug", true);

// finds a game by its id
function findGameById(id) {
  return gameModel.findById(id);
}

// finds a game by its title
function findGameByTitle(title) {
  return gameModel.find({ title: title });
}

// gets game list
function getGames() {
  return gameModel.find();
}

// gets array of players signed up for a game
function getPlayersInGame(gameId) {
  return findGameById(gameId).populate("players");
}

// creates new game
function createGame(game) {
  return new gameModel(game).save();
}

// deletes game
function deleteGame(id) {
  return gameModel.findByIdAndDelete(id);
}

export default {
  getGames,
  findGameById,
  getPlayersInGame,
  createGame,
  findGameByTitle,
  deleteGame,
};
