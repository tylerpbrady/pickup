import mongoose from "mongoose";
import gameModel from "./game.js";
import connectToDatabase from './atlas.js';

mongoose.set("debug", true);

function findGameById(id) {
    return gameModel.findById(id);
}

function findGameByTitle(title) {
    return gameModel.find({title: title})
}

function getGames() {
    return gameModel.find();
}

function getPlayersInGame(gameId) {
    return findGameById(gameId).populate("players")
}

function createGame(game) {
    return new gameModel(game).save()
}

function deleteGame(id) {
    return gameModel.findByIdAndDelete(id)
}

export default {getGames, findGameById, getPlayersInGame, createGame, findGameByTitle, deleteGame}



